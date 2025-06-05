import React from 'react';
import { GameMode } from '../types';
import { SINGLE_PLAYER_TARGET_SCORE } from '../constants'; // MAX_ALLOWED_INCORRECT_ANSWERS removed
import { RefreshIcon, TrophyIcon, ShareIcon } from './icons'; 
import { T } from '../localization';

interface GameOverScreenProps {
  gameMode: GameMode;
  scores: { 
    p1: number; // For MP P1 and Practice Correct Count
    p2: number; // For MP P2
    consecutiveCorrect?: number; // For Single Player Total Correct
    totalIncorrectAnswers?: number; // For Single Player Total Incorrect
  };
  onPlayAgain: () => void; 
  winner?: 1 | 2 | 'draw' | undefined; // undefined for SP completion
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameMode, scores, onPlayAgain, winner }) => {
  let title = T.gameOver;
  let message = "";
  let showTrophy = false;

  if (gameMode === GameMode.SINGLE_PLAYER) {
    title = T.singlePlayerGameCompleteTitle;
    message = T.singlePlayerGameCompleteMessage(
      scores.consecutiveCorrect, // Total correct for SP
      scores.totalIncorrectAnswers, // Total incorrect for SP
      SINGLE_PLAYER_TARGET_SCORE // Total questions in SP mode
    );
    if ((scores.consecutiveCorrect ?? 0) > 0) { // Show trophy if at least one correct answer
        showTrophy = true;
    }
  } else if (gameMode === GameMode.MULTIPLAYER) {
    if (winner === 'draw') {
      title = T.drawMessage(scores.p1);
    } else if (winner === 1) {
      title = `${T.player1} ${T.congratulations.toLowerCase()}`;
      message = T.player1WinsMessage(scores.p1, scores.p2);
      showTrophy = true;
    } else if (winner === 2) {
      title = `${T.player2} ${T.congratulations.toLowerCase()}`;
      message = T.player2WinsMessage(scores.p1, scores.p2);
      showTrophy = true;
    }
  } else if (gameMode === GameMode.PRACTICE) {
    title = T.practiceSessionEnded;
    message = T.practiceSummary(scores.p1); // scores.p1 holds correct answers for Practice
    if ((scores.p1 ?? 0) > 0) showTrophy = true; 
  }

  const handleShare = () => {
    let shareText: string;
    if (gameMode === GameMode.SINGLE_PLAYER) {
        shareText = `ฉันตอบถูก ${scores.consecutiveCorrect ?? 0} ข้อจาก ${SINGLE_PLAYER_TARGET_SCORE} ข้อใน ${T.gameTitle}! มาเล่นกันเถอะ!`;
    } else if (gameMode === GameMode.MULTIPLAYER) {
        if (winner === 1) shareText = `${T.player1} ชนะด้วยคะแนน ${scores.p1} ต่อ ${scores.p2} ใน ${T.gameTitle}!`;
        else if (winner === 2) shareText = `${T.player2} ชนะด้วยคะแนน ${scores.p2} ต่อ ${scores.p1} ใน ${T.gameTitle}!`;
        else if (winner === 'draw') shareText = `ฉันเสมอด้วยคะแนน ${scores.p1} ใน ${T.gameTitle}!`;
        else shareText = `ฉันเล่น ${T.gameTitle} ได้ ${scores.p1} คะแนน!`; // Fallback for MP
    } else { // Practice
        shareText = `ฉันฝึกซ้อมใน ${T.gameTitle} และตอบถูก ${scores.p1} ข้อ!`;
    }
    
    let currentUrl = window.location.href;
    let isValidHttpUrl = false;
    try {
      const urlObject = new URL(currentUrl);
      if (urlObject.protocol === "http:" || urlObject.protocol === "https:") {
        isValidHttpUrl = true;
      }
    } catch (e) {
      isValidHttpUrl = false;
    }

    const shareData: ShareData = {
      title: T.gameTitle,
      text: shareText,
    };

    if (isValidHttpUrl) {
      shareData.url = currentUrl;
    }

    if (navigator.share) {
      navigator.share(shareData)
        .catch(err => {
          console.error("Error sharing:", err);
          if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText + (isValidHttpUrl ? ` ${currentUrl}` : ''))
              .then(() => alert(T.shareScoreCopied))
              .catch(clipErr => console.error("Error copying to clipboard:", clipErr));
          } else {
            alert(T.shareScoreNotPossible);
          }
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText + (isValidHttpUrl ? ` ${currentUrl}` : ''))
        .then(() => alert(T.shareScoreCopied))
        .catch(clipErr => console.error("Error copying to clipboard:", clipErr));
    } else {
      alert(T.shareScoreNotPossible);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto">
      {showTrophy && (
        <TrophyIcon className="w-20 h-20 sm:w-24 sm:h-24 text-yellow-500 mb-4 animate-bounce" />
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] mb-3">{title}</h2>
      <p className="text-lg sm:text-xl text-neutral-700 mb-8">{message}</p>
      
      <div className="w-full space-y-3">
        <button
          onClick={onPlayAgain} 
          className="w-full flex items-center justify-center bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] hover:from-[#40afde] hover:to-[#8a49a5] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/80 focus:ring-[#50bfe6]"
        >
          <RefreshIcon className="w-5 h-5 mr-2" />
          {T.playAgain}
        </button>
        
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-neutral-700 font-semibold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/80 focus:ring-slate-400"
        >
          <ShareIcon className="w-5 h-5 mr-2" />
          {T.shareScore}
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;