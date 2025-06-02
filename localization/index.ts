import { Category, Difficulty, GameMode } from '../types';
import { th } from './th';

export const T = th;

export const getCategoryDisplayName = (category: Category): string => {
  switch (category) {
    case Category.SCIENCE: return T.science;
    case Category.GENERAL_KNOWLEDGE: return T.generalKnowledge;
    case Category.MATHEMATICS: return T.mathematics;
    case Category.HISTORY: return T.history;
    case Category.ENGLISH: return T.english;
    case Category.RANDOM: return T.random;
    default:
      const exhaustiveCheck: never = category;
      return exhaustiveCheck;
  }
};

export const getCategoryIcon = (category: Category): string => {
  switch (category) {
    case Category.SCIENCE: return T.categoryIconScience;
    case Category.GENERAL_KNOWLEDGE: return T.categoryIconGeneralKnowledge;
    case Category.MATHEMATICS: return T.categoryIconMathematics;
    case Category.HISTORY: return T.categoryIconHistory;
    case Category.ENGLISH: return T.categoryIconEnglish;
    case Category.RANDOM: return T.categoryIconRandom;
    default:
      const exhaustiveCheck: never = category;
      return exhaustiveCheck;
  }
};

export const getDifficultyDisplayName = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case Difficulty.EASY: return T.easy;
    case Difficulty.MEDIUM: return T.medium;
    case Difficulty.HARD: return T.hard;
    default:
      const exhaustiveCheck: never = difficulty;
      return exhaustiveCheck;
  }
};

export const getDifficultyDescription = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case Difficulty.EASY: return T.difficultyDescriptionEasy;
    case Difficulty.MEDIUM: return T.difficultyDescriptionMedium;
    case Difficulty.HARD: return T.difficultyDescriptionHard;
    default:
      const exhaustiveCheck: never = difficulty;
      return exhaustiveCheck;
  }
};

export const getGameModeDisplayName = (gameMode: GameMode): string => {
  switch (gameMode) {
    case GameMode.SINGLE_PLAYER: return T.singlePlayer;
    case GameMode.MULTIPLAYER: return T.multiplayer;
    case GameMode.PRACTICE: return T.practice;
    default:
      const exhaustiveCheck: never = gameMode;
      return exhaustiveCheck;
  }
};
