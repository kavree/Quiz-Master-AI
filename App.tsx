
import React, { useState, useEffect, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameMode, Category, Difficulty, QuizQuestion, GameState, GameSettings } from './types';
import { fetchQuizQuestion } from './services/geminiService';
import { SINGLE_PLAYER_TARGET_SCORE, MULTIPLAYER_QUESTIONS_PER_PLAYER, FEEDBACK_DELAY_MS } from './constants';
import { T } from './localization';

// gameOverWinner for Multiplayer and specific Single Player outcomes (if any were kept, but now mostly for MP)
type GameOverWinnerType = 1 | 2 | 'draw' | undefined;

// Adjusted scores state for clarity in Single Player
interface ScoresState {
  p1: number; // Used for Practice mode correct count & Multiplayer P1
  p2: number; // Used for Multiplayer P2
  totalCorrectSinglePlayer?: number; // Total correct answers in Single Player
  totalIncorrectAnswers?: number; // Total incorrect answers in Single Player
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START_SCREEN);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  
  const [currentQuestionData, setCurrentQuestionData] = useState<QuizQuestion | null>(null);
  const [questionsAskedThisSession, setQuestionsAskedThisSession] = useState<string[]>([]);
  
  const initialScores: ScoresState = { p1: 0, p2: 0, totalCorrectSinglePlayer: 0, totalIncorrectAnswers: 0 };
  const [scores, setScores] = useState<ScoresState>(initialScores);
  
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<1 | 2>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // Overall question index (0-based) for the current game

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const [gameOverWinner, setGameOverWinner] = useState<GameOverWinnerType>(undefined);

  const resetGameState = useCallback(() => {
    setGameSettings(null);
    setCurrentQuestionData(null);
    setQuestionsAskedThisSession([]);
    setScores(initialScores);
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
    setScores(initialScores);
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

    let updatedScoresAfterAnswer = { ...scores }; 

    setScores(prevScores => {
      let nextP1Score = prevScores.p1;
      let nextP2Score = prevScores.p2;
      let nextTotalCorrectSinglePlayer = prevScores.totalCorrectSinglePlayer || 0;
      let nextTotalIncorrectAnswers = prevScores.totalIncorrectAnswers || 0;

      if (gameSettings.mode === GameMode.SINGLE_PLAYER) {
          if (isCorrect) {
            nextTotalCorrectSinglePlayer = (prevScores.totalCorrectSinglePlayer || 0) + 1;
          } else {
            nextTotalIncorrectAnswers = (prevScores.totalIncorrectAnswers || 0) + 1;
          }
      } else if (gameSettings.mode === GameMode.MULTIPLAYER) {
          if (currentPlayerTurn === 1 && isCorrect) nextP1Score = prevScores.p1 + 1;
          if (currentPlayerTurn === 2 && isCorrect) nextP2Score = prevScores.p2 + 1;
      } else if (gameSettings.mode === GameMode.PRACTICE) {
          if (isCorrect) nextP1Score = prevScores.p1 + 1; // p1 used for Practice correct count
      }
      
      updatedScoresAfterAnswer = {
          p1: nextP1Score,
          p2: nextP2Score,
          totalCorrectSinglePlayer: nextTotalCorrectSinglePlayer,
          totalIncorrectAnswers: nextTotalIncorrectAnswers
      };
      return updatedScoresAfterAnswer;
    });

    setTimeout(() => {
      const currentScores = updatedScoresAfterAnswer; // Scores after this answer
      const nextQuestionOverallIndex = currentQuestionIndex + 1; // Index for the next question if game continues

      if (gameSettings.mode === GameMode.SINGLE_PLAYER) {
          // Check if the total number of questions for Single Player mode has been reached
          if (nextQuestionOverallIndex >= SINGLE_PLAYER_TARGET_SCORE) {
            setGameOverWinner(undefined); // Game ends by completion, no specific winner/loser type
            setGameState(GameState.GAME_OVER);
          } else {
            // Continue to the next question
            setCurrentQuestionIndex(nextQuestionOverallIndex);
            loadNextQuestion();
          }
      }
      else if (gameSettings.mode === GameMode.MULTIPLAYER) {
        if (nextQuestionOverallIndex >= MULTIPLAYER_QUESTIONS_PER_PLAYER * 2) {
          setGameState(GameState.GAME_OVER);
          if (currentScores.p1 > currentScores.p2) setGameOverWinner(1);
          else if (currentScores.p2 > currentScores.p1) setGameOverWinner(2);
          else setGameOverWinner('draw');
        } else {
          setCurrentPlayerTurn(prevTurn => (prevTurn === 1 ? 2 : 1));
          setCurrentQuestionIndex(nextQuestionOverallIndex);
          loadNextQuestion();
        }
      }
      else if (gameSettings.mode === GameMode.PRACTICE) {
        setCurrentQuestionIndex(nextQuestionOverallIndex);
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
        // Pass appropriate score fields based on mode for GameScreen
        scores={{ 
            p1: gameSettings.mode === GameMode.PRACTICE ? scores.p1 : (gameSettings.mode === GameMode.MULTIPLAYER ? scores.p1 : (scores.totalCorrectSinglePlayer ?? 0)),
            p2: scores.p2, 
            // For GameScreen, pass totalCorrect and totalIncorrect for Single Player if needed by ScoreBoard
            consecutiveCorrect: scores.totalCorrectSinglePlayer, // Re-purposed for total correct in SP
            totalIncorrectAnswers: scores.totalIncorrectAnswers
        }}
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
        // Pass scores directly, GameOverScreen will interpret based on mode
        scores={{
          p1: scores.p1, // Still relevant for MP and Practice
          p2: scores.p2, // Still relevant for MP
          consecutiveCorrect: scores.totalCorrectSinglePlayer, // totalCorrect for SP summary
          totalIncorrectAnswers: scores.totalIncorrectAnswers // totalIncorrect for SP summary
        }}
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