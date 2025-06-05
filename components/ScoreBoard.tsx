import React from 'react';
import { GameMode } from '../types';
import { SINGLE_PLAYER_TARGET_SCORE, MULTIPLAYER_QUESTIONS_PER_PLAYER } from '../constants';
import { T } from '../localization';

interface ScoreBoardProps {
  gameMode: GameMode;
  scores: { 
    p1: number; // For MP P1 and Practice Correct Count
    p2: number; // For MP P2
    consecutiveCorrect?: number; // For Single Player Total Correct
    totalIncorrectAnswers?: number; // For Single Player Total Incorrect
  };
  currentPlayerTurn?: 1 | 2;
  currentQuestionIndex: number; // 0-indexed
  totalQuestions?: number; // Total questions for modes like MP for progress bar
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameMode, scores, currentPlayerTurn, currentQuestionIndex, totalQuestions }) => {
  
  const getMultiplayerProgressPercent = () => {
    if (!totalQuestions || totalQuestions === 0) return 0;
    // For multiplayer, currentQuestionIndex is the overall index of questions answered by both players
    return Math.min(100, (currentQuestionIndex / totalQuestions) * 100);
  };

  const getSinglePlayerProgressPercent = () => {
    // currentQuestionIndex is 0-indexed, so +1 for current question number
    return Math.min(100, ((currentQuestionIndex +1) / SINGLE_PLAYER_TARGET_SCORE) * 100);
  };


  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg mb-6 text-neutral-700">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {gameMode === GameMode.SINGLE_PLAYER && (
          <>
            <div className="text-lg">
              {T.singlePlayerScoreCorrect}: <span className="font-bold text-emerald-500">{scores.consecutiveCorrect ?? 0}</span>
              <span className="mx-2 text-neutral-400">|</span>
              {T.singlePlayerScoreIncorrect}: <span className="font-bold text-red-500">{scores.totalIncorrectAnswers ?? 0}</span>
            </div>
            <div className="text-sm text-neutral-500">{T.questionLabel} {currentQuestionIndex + 1} / {SINGLE_PLAYER_TARGET_SCORE}</div>
          </>
        )}
        {gameMode === GameMode.MULTIPLAYER && (
          <>
            <div className={`text-lg p-2 rounded-lg transition-all duration-300 ${currentPlayerTurn === 1 ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md' : 'opacity-70'}`}>
              {T.player1}: <span className="font-bold">{scores.p1}</span>
            </div>
            <div className="text-sm text-neutral-600 font-medium mx-2 my-2 sm:my-0">
              {T.questionShortLabel}: {Math.floor(currentQuestionIndex / 2) + 1} / {MULTIPLAYER_QUESTIONS_PER_PLAYER}
            </div>
            <div className={`text-lg p-2 rounded-lg transition-all duration-300 ${currentPlayerTurn === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'opacity-70'}`}>
              {T.player2}: <span className="font-bold">{scores.p2}</span>
            </div>
          </>
        )}
        {gameMode === GameMode.PRACTICE && (
          <>
            <div className="text-lg">{T.correctAnswersLabel}: <span className="font-bold text-emerald-500">{scores.p1}</span></div>
            <div className="text-sm text-neutral-500">{T.questionLabel} {currentQuestionIndex + 1}</div>
          </>
        )}
      </div>
      {/* Progress Bar for Multiplayer */}
      {totalQuestions && gameMode === GameMode.MULTIPLAYER && (
         <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${getMultiplayerProgressPercent()}%` }}
            ></div>
          </div>
      )}
      {/* Progress Bar for Single Player */}
       {gameMode === GameMode.SINGLE_PLAYER && (
         <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${getSinglePlayerProgressPercent()}%` }}
            ></div>
          </div>
      )}
    </div>
  );
};

export default ScoreBoard;