import React, { useState } from 'react';
import { GameMode, Category, Difficulty, GameSettings } from '../types';
import { GAME_TITLE, CATEGORY_ITEMS, DIFFICULTY_ITEMS, GAME_MODE_ITEMS } from '../constants';
import { BrainIcon, UserIcon, UsersIcon } from './icons'; 
import { T, getCategoryIcon, getDifficultyDescription } from '../localization';

interface StartScreenProps {
  onStartGame: (settings: GameSettings) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [mode, setMode] = useState<GameMode>(GameMode.SINGLE_PLAYER);
  const [category, setCategory] = useState<Category>(Category.RANDOM);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({ mode, category, difficulty });
  };

  const ModeIcon = ({ gameMode, selected }: { gameMode: GameMode, selected: boolean }) => {
    const iconClass = `w-8 h-8 mb-2 ${selected ? 'text-white' : 'text-purple-600 group-hover:text-purple-700'}`;
    if (gameMode === GameMode.SINGLE_PLAYER) return <UserIcon className={iconClass} />;
    if (gameMode === GameMode.MULTIPLAYER) return <UsersIcon className={iconClass} />;
    if (gameMode === GameMode.PRACTICE) return <BrainIcon className={iconClass} strokeWidth={2}/>;
    return null;
  };
  
  const gameModeColors: Record<GameMode, { base: string, hover: string, selected: string, textSelected: string, textBase: string }> = {
    [GameMode.SINGLE_PLAYER]: { base: 'bg-sky-100', hover: 'hover:bg-sky-200', selected: 'bg-gradient-to-r from-sky-500 to-blue-600', textSelected: 'text-white', textBase: 'text-sky-700'},
    [GameMode.MULTIPLAYER]: { base: 'bg-emerald-100', hover: 'hover:bg-emerald-200', selected: 'bg-gradient-to-r from-emerald-500 to-green-600', textSelected: 'text-white', textBase: 'text-emerald-700'},
    [GameMode.PRACTICE]: { base: 'bg-fuchsia-100', hover: 'hover:bg-fuchsia-200', selected: 'bg-gradient-to-r from-fuchsia-500 to-pink-600', textSelected: 'text-white', textBase: 'text-fuchsia-700'},
  };


  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl space-y-8">
      <div className="text-center">
        <BrainIcon className="w-20 h-20 mx-auto text-transparent bg-clip-text bg-gradient-to-br from-[#50bfe6] to-[#9b59b6] mb-3" strokeWidth={1}/>
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#333333] via-[#50bfe6] to-[#9b59b6]">
          {GAME_TITLE}
        </h1>
        <p className="text-neutral-600 mt-3 text-lg">{T.startScreenTagline}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Game Mode Selection */}
        <div>
          <label className="block text-xl font-semibold text-neutral-700 mb-3 text-center sm:text-left">{T.gameModeLabel}</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {GAME_MODE_ITEMS.map((gmItem) => (
              <button
                key={gmItem.value}
                type="button"
                onClick={() => setMode(gmItem.value)}
                className={`group flex flex-col items-center justify-center p-4 rounded-xl text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg
                  ${mode === gmItem.value 
                    ? `${gameModeColors[gmItem.value].selected} ${gameModeColors[gmItem.value].textSelected} ring-2 ring-offset-2 ring-white/80 ring-offset-transparent` 
                    : `${gameModeColors[gmItem.value].base} ${gameModeColors[gmItem.value].hover} ${gameModeColors[gmItem.value].textBase}`
                  }`}
              >
                <ModeIcon gameMode={gmItem.value} selected={mode === gmItem.value} />
                {gmItem.displayName}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-xl font-semibold text-neutral-700 mb-3 text-center sm:text-left">{T.categoryLabel}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {CATEGORY_ITEMS.map((catItem) => (
              <button
                key={catItem.value}
                type="button"
                onClick={() => setCategory(catItem.value)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex flex-col items-center justify-center h-28 sm:h-32
                  ${category === catItem.value 
                    ? 'bg-gradient-to-br from-[#50bfe6] to-[#9b59b6] text-white ring-2 ring-offset-2 ring-white/80 ring-offset-transparent' 
                    : 'bg-slate-100 hover:bg-slate-200 text-neutral-700'
                  }`}
              >
                <span className="text-3xl mb-1">{getCategoryIcon(catItem.value)}</span>
                {catItem.displayName}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-xl font-semibold text-neutral-700 mb-3 text-center sm:text-left">{T.difficultyLabel}</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {DIFFICULTY_ITEMS.map((diffItem) => (
              <button
                key={diffItem.value}
                type="button"
                onClick={() => setDifficulty(diffItem.value)}
                className={`p-4 rounded-xl text-left transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex flex-col justify-between h-36 sm:h-40
                  ${difficulty === diffItem.value 
                    ? 'bg-gradient-to-br from-[#50bfe6] to-[#9b59b6] text-white ring-2 ring-offset-2 ring-white/80 ring-offset-transparent' 
                    : 'bg-slate-100 hover:bg-slate-200 text-neutral-700'
                  }`}
              >
                <span className="font-semibold text-lg">{diffItem.displayName}</span>
                <span className="text-xs mt-1 opacity-80">{getDifficultyDescription(diffItem.value)}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] hover:from-[#40afde] hover:to-[#8a49a5] text-white font-semibold py-4 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/80 focus:ring-[#50bfe6] text-lg"
        >
          {T.startGame} ✨
        </button>
      </form>
    </div>
  );
};

export default StartScreen;