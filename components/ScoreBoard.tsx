import React from 'react';
import { GameMode } from '../types';
import { SINGLE_PLAYER_TARGET_SCORE, MULTIPLAYER_QUESTIONS_PER_PLAYER } from '../constants';
import { T } from '../localization';

interface ScoreBoardProps {
  gameMode: GameMode;
  scores: { p1: number; p2: number; consecutiveCorrect?: number };
  currentPlayerTurn?: 1 | 2;
  currentQuestionIndex: number; 
  totalQuestions?: number; 
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameMode, scores, currentPlayerTurn, currentQuestionIndex, totalQuestions }) => {
  
  const getProgressPercent = () => {
    if (!totalQuestions || totalQuestions === 0) return 0;
    return Math.min(100, (currentQuestionIndex / totalQuestions) * 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg mb-6 text-neutral-700">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {gameMode === GameMode.SINGLE_PLAYER && (
          <>
            <div className="text-lg">{T.scoreLabel}: <span className="font-bold text-[#50bfe6]">{scores.consecutiveCorrect ?? 0} / {SINGLE_PLAYER_TARGET_SCORE}</span></div>
            <div className="text-sm text-neutral-500">{T.questionLabel} {currentQuestionIndex + 1}</div>
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
      {totalQuestions && gameMode !== GameMode.PRACTICE && gameMode !== GameMode.SINGLE_PLAYER && (
         <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${getProgressPercent()}%` }}
            ></div>
          </div>
      )}
       {gameMode === GameMode.SINGLE_PLAYER && (
         <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${Math.min(100, ((scores.consecutiveCorrect ?? 0) / SINGLE_PLAYER_TARGET_SCORE) * 100)}%` }}
            ></div>
          </div>
      )}
    </div>
  );
};

export default ScoreBoard;