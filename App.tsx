
import React, { useState, useEffect, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameMode, Category, Difficulty, QuizQuestion, GameState, GameSettings } from './types';
import { fetchQuizQuestion } from './services/geminiService';
import { SINGLE_PLAYER_TARGET_SCORE, MULTIPLAYER_QUESTIONS_PER_PLAYER, FEEDBACK_DELAY_MS, MAX_ALLOWED_INCORRECT_ANSWERS } from './constants';
import { T } from './localization';

// Extend gameOverWinner to include the new loss condition
type GameOverWinnerType = 1 | 2 | 'draw' | 'player' | 'loss_by_strikes' | undefined;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START_SCREEN);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  
  const [currentQuestionData, setCurrentQuestionData] = useState<QuizQuestion | null>(null);
  const [questionsAskedThisSession, setQuestionsAskedThisSession] = useState<string[]>([]);
  
  const [scores, setScores] = useState<{ p1: number; p2: number; consecutiveCorrect?: number, totalIncorrectAnswers?: number }>({ p1: 0, p2: 0, consecutiveCorrect: 0, totalIncorrectAnswers: 0 });
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<1 | 2>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // Overall question index for the current game

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const [gameOverWinner, setGameOverWinner] = useState<GameOverWinnerType>(undefined);

  const resetGameState = useCallback(() => {
    setGameSettings(null);
    setCurrentQuestionData(null);
    setQuestionsAskedThisSession([]);
    setScores({ p1: 0, p2: 0, consecutiveCorrect: 0, totalIncorrectAnswers: 0 });
    setCurrentPlayerTurn(1);
    setCurrentQuestionIndex(0);
    setIsLoading(false);
    setError(null);
    setIsAnswerRevealed(false);
    setSelectedAnswer(undefined);
    setGameOverWinner(undefined);
    setGameState(GameState.START_SCREEN);
  }, []);

  const loadNextQuestion = useCallback(async () => {
    if (!gameSettings) return;
    
    setIsLoading(true);
    setError(null);
    setIsAnswerRevealed(false);
    setSelectedAnswer(undefined);

    try {
      const question = await fetchQuizQuestion(
        gameSettings.category,
        gameSettings.difficulty,
        questionsAskedThisSession
      );
      setCurrentQuestionData(question);
      setQuestionsAskedThisSession(prev => [...prev, question.question]); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching the question.');
      console.error("Error in loadNextQuestion:", err);
    } finally {
      setIsLoading(false);
    }
  }, [gameSettings, questionsAskedThisSession]);

  const handleStartGame = useCallback((settings: GameSettings) => {
    setGameSettings(settings);
    setCurrentQuestionData(null); 
    setQuestionsAskedThisSession([]); 
    setScores({ p1: 0, p2: 0, consecutiveCorrect: 0, totalIncorrectAnswers: 0 });
    setCurrentPlayerTurn(1);
    setCurrentQuestionIndex(0);
    setIsLoading(false); 
    setError(null); 
    setIsAnswerRevealed(false);
    setSelectedAnswer(undefined);
    setGameOverWinner(undefined);
    setGameState(GameState.IN_GAME);
  }, []);
  
  useEffect(() => {
    if (gameState === GameState.IN_GAME && gameSettings && !currentQuestionData && !isLoading && !error) {
      loadNextQuestion();
    }
  }, [gameState, gameSettings, currentQuestionData, isLoading, error, loadNextQuestion]);


  const handleAnswer = useCallback((answer: string) => {
    if (!currentQuestionData || isAnswerRevealed || !gameSettings) return;

    setSelectedAnswer(answer);
    setIsAnswerRevealed(true);
    const isCorrect = answer === currentQuestionData.correctAnswer;

    // This will hold the scores to be used in the timeout logic
    let updatedScoresAfterAnswer = { ...scores }; 

    setScores(prevScores => {
      let nextP1Score = prevScores.p1;
      let nextP2Score = prevScores.p2;
      let nextConsecutiveCorrect = prevScores.consecutiveCorrect || 0;
      let nextTotalIncorrectAnswers = prevScores.totalIncorrectAnswers || 0;

      if (gameSettings.mode === GameMode.SINGLE_PLAYER) {
          if (isCorrect) {
            nextConsecutiveCorrect = (prevScores.consecutiveCorrect || 0) + 1;
          } else {
            nextConsecutiveCorrect = 0; // Streak breaks
            nextTotalIncorrectAnswers = (prevScores.totalIncorrectAnswers || 0) + 1;
          }
      } else if (gameSettings.mode === GameMode.MULTIPLAYER) {
          if (currentPlayerTurn === 1 && isCorrect) nextP1Score = prevScores.p1 + 1;
          if (currentPlayerTurn === 2 && isCorrect) nextP2Score = prevScores.p2 + 1;
      } else if (gameSettings.mode === GameMode.PRACTICE) {
          if (isCorrect) nextP1Score = prevScores.p1 + 1; 
      }
      
      updatedScoresAfterAnswer = {
          p1: nextP1Score,
          p2: nextP2Score,
          consecutiveCorrect: nextConsecutiveCorrect,
          totalIncorrectAnswers: nextTotalIncorrectAnswers
      };
      return updatedScoresAfterAnswer;
    });

    setTimeout(() => {
      // Use updatedScoresAfterAnswer which reflects the immediate result of the current answer
      const currentScores = updatedScoresAfterAnswer;

      if (gameSettings.mode === GameMode.SINGLE_PLAYER) {
          if (isCorrect) {
            if (currentScores.consecutiveCorrect === SINGLE_PLAYER_TARGET_SCORE) {
              setGameOverWinner('player');
              setGameState(GameState.GAME_OVER);
            } else {
              setCurrentQuestionIndex(prev => prev + 1);
              loadNextQuestion();
            }
          } else { // Incorrect answer in Single Player
            if (currentScores.totalIncorrectAnswers && currentScores.totalIncorrectAnswers >= MAX_ALLOWED_INCORRECT_ANSWERS) {
              setGameOverWinner('loss_by_strikes');
              setGameState(GameState.GAME_OVER);
            } else {
              // Game continues even if incorrect, as long as not 3 strikes
              setCurrentQuestionIndex(prev => prev + 1);
              loadNextQuestion();
            }
          }
      }
      else if (gameSettings.mode === GameMode.MULTIPLAYER) {
        const newQuestionIndex = currentQuestionIndex + 1;
        if (newQuestionIndex >= MULTIPLAYER_QUESTIONS_PER_PLAYER * 2) {
          setGameState(GameState.GAME_OVER);
          // Scores used for determining winner should be the final scores
          if (currentScores.p1 > currentScores.p2) setGameOverWinner(1);
          else if (currentScores.p2 > currentScores.p1) setGameOverWinner(2);
          else setGameOverWinner('draw');
        } else {
          setCurrentPlayerTurn(prevTurn => (prevTurn === 1 ? 2 : 1));
          setCurrentQuestionIndex(newQuestionIndex);
          loadNextQuestion();
        }
      }
      else if (gameSettings.mode === GameMode.PRACTICE) {
        setCurrentQuestionIndex(prev => prev + 1);
        loadNextQuestion();
      }
    }, FEEDBACK_DELAY_MS);

  }, [currentQuestionData, gameSettings, scores, currentPlayerTurn, loadNextQuestion, isAnswerRevealed, currentQuestionIndex]);


  if (gameState === GameState.START_SCREEN) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  if (gameState === GameState.IN_GAME && gameSettings) {
    return (
      <GameScreen
        gameMode={gameSettings.mode}
        currentQuestionData={currentQuestionData}
        onAnswer={handleAnswer}
        isLoading={isLoading}
        error={error}
        scores={scores}
        currentPlayerTurn={currentPlayerTurn}
        currentQuestionIndex={currentQuestionIndex}
        isAnswerRevealed={isAnswerRevealed}
        selectedAnswer={selectedAnswer}
        onRestart={resetGameState}
      />
    );
  }

  if (gameState === GameState.GAME_OVER && gameSettings) {
    return (
      <GameOverScreen
        gameMode={gameSettings.mode}
        scores={scores}
        onPlayAgain={resetGameState}
        winner={gameOverWinner}
      />
    );
  }

  return (
    <div className="text-center text-xl p-4 text-slate-300">
      <p className="mb-4">{T.appLoadingOrError}</p>
      <button 
        onClick={resetGameState} 
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-150 ease-in-out"
      >
        {T.resetApplication}
      </button>
    </div>
  );
};

export default App;