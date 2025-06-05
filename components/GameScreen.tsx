
import React from 'react';
import { QuizQuestion, GameMode } from '../types';
import QuestionCard from './QuestionCard';
import ScoreBoard from './ScoreBoard';
import LoadingSpinner from './LoadingSpinner';
import { HomeIcon } from './icons'; // Changed from RefreshIcon to HomeIcon
import { MULTIPLAYER_QUESTIONS_PER_PLAYER, SINGLE_PLAYER_TARGET_SCORE } from '../constants';
import { T } from '../localization';

interface GameScreenProps {
  gameMode: GameMode;
  currentQuestionData: QuizQuestion | null;
  onAnswer: (selectedAnswer: string) => void;
  isLoading: boolean;
  error: string | null;
  scores: { 
    p1: number; 
    p2: number; 
    consecutiveCorrect?: number; 
    totalIncorrectAnswers?: number; // Added this line
  };
  currentPlayerTurn?: 1 | 2;
  currentQuestionIndex: number; 
  isAnswerRevealed: boolean;
  selectedAnswer?: string;
  onRestart: () => void; // This function now means "Back to Home / Reset Game"
}

const GameScreen: React.FC<GameScreenProps> = ({
  gameMode,
  currentQuestionData,
  onAnswer,
  isLoading,
  error,
  scores,
  currentPlayerTurn,
  currentQuestionIndex,
  isAnswerRevealed,
  selectedAnswer,
  onRestart,
}) => {

  let totalQuestionsInMode: number | undefined;
  if (gameMode === GameMode.MULTIPLAYER) {
    totalQuestionsInMode = MULTIPLAYER_QUESTIONS_PER_PLAYER * 2;
  } else if (gameMode === GameMode.SINGLE_PLAYER) {
    totalQuestionsInMode = SINGLE_PLAYER_TARGET_SCORE; // For progress display logic in scoreboard
  }
  // Practice mode doesn't have a fixed total for progress bar in the same way

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full">
      <button
        onClick={onRestart}
        className="absolute top-4 right-4 bg-white/70 hover:bg-white/90 backdrop-blur-sm text-neutral-600 hover:text-[#9b59b6] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#9b59b6]"
        title={T.backToHome}
        aria-label={T.backToHome}
      >
        <HomeIcon className="w-6 h-6" />
      </button>

      <ScoreBoard 
        gameMode={gameMode} 
        scores={scores} 
        currentPlayerTurn={currentPlayerTurn}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestionsInMode}
      />

      {isLoading && <LoadingSpinner />}
      {error && !isLoading && (
        <div className="text-center text-red-600 bg-red-100/80 backdrop-blur-sm p-6 rounded-xl shadow-md max-w-md w-full">
          <p className="text-xl font-semibold">{T.errorOccurred}</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="mt-3 text-xs text-neutral-500">{T.errorApiKeyOrNetwork}</p>
          { (error.includes("API_KEY") || error.includes("Mock Question") || error.includes("API Key Missing") || error.includes("API Error")) && 
            <p className="mt-1 text-xs text-neutral-500">{T.errorMockQuestionInfo}</p>
          }
        </div>
      )}
      {!isLoading && !error && currentQuestionData && (
        <QuestionCard
          question={currentQuestionData}
          onAnswer={onAnswer}
          isAnswerRevealed={isAnswerRevealed}
          selectedAnswer={selectedAnswer}
        />
      )}
      
      {isAnswerRevealed && currentQuestionData && !isLoading && (
        <div className="mt-6 text-center p-4 rounded-lg w-full max-w-2xl mx-auto min-h-[80px]"> {/* Added min-height to prevent layout shift */}
          {selectedAnswer === currentQuestionData.correctAnswer ? (
             <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 animate-pulse">{T.correct} 🎉</p>
          ) : (
            <div>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">{T.incorrect} 😟</p>
              <p className="text-neutral-600 mt-2 text-sm sm:text-base">{T.correctAnswerWas} <strong className="text-yellow-600" dangerouslySetInnerHTML={{ __html: currentQuestionData.correctAnswer }}></strong></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
