import React from 'react';
import { GameMode } from '../types';
import { SINGLE_PLAYER_TARGET_SCORE, MAX_ALLOWED_INCORRECT_ANSWERS } from '../constants';
import { RefreshIcon, TrophyIcon, ShareIcon, HomeIcon } from './icons'; // Added HomeIcon
import { T } from '../localization';

interface GameOverScreenProps {
  gameMode: GameMode;
  scores: { p1: number; p2: number; consecutiveCorrect?: number; totalIncorrectAnswers?: number };
  onPlayAgain: () => void; 
  winner?: 1 | 2 | 'draw' | 'player' | 'loss_by_strikes'; 
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameMode, scores, onPlayAgain, winner }) => {
  let title = T.gameOver;
  let message = "";
  let showTrophy = false;

  if (gameMode === GameMode.SINGLE_PLAYER) {
    if (winner === 'player') {
      title = T.congratulations;
      message = T.singlePlayerWinMessage(SINGLE_PLAYER_TARGET_SCORE);
      showTrophy = true;
    } else if (winner === 'loss_by_strikes') {
      title = T.gameOver;
      message = T.singlePlayerLossByStrikesMessage(MAX_ALLOWED_INCORRECT_ANSWERS);
    }
     else { // Default loss, e.g. if game ends for other reasons or just general loss
      title = T.gameOver;
      message = T.singlePlayerLossMessage(scores.consecutiveCorrect);
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
    message = T.practiceSummary(scores.p1);
    if ((scores.p1 ?? 0) > 0) showTrophy = true; 
  }

  const handleShare = () => {
    const scoreToShare = gameMode === GameMode.SINGLE_PLAYER ? (scores.consecutiveCorrect ?? 0) : scores.p1;
    const shareText = `ฉันได้คะแนน ${scoreToShare} ใน ${T.gameTitle}! มาเล่นกันเถอะ!`;
    
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