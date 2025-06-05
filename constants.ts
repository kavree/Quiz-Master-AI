import { Category, Difficulty, GameMode } from './types';
import { T, getCategoryDisplayName, getDifficultyDisplayName, getGameModeDisplayName } from './localization';

export const GAME_TITLE = T.gameTitle;

export const CATEGORY_ITEMS = Object.values(Category).map(cat => ({
  value: cat,
  displayName: getCategoryDisplayName(cat),
}));

export const DIFFICULTY_ITEMS = Object.values(Difficulty).map(diff => ({
  value: diff,
  displayName: getDifficultyDisplayName(diff),
}));

export const GAME_MODE_ITEMS = Object.values(GameMode).map(gm => ({
  value: gm,
  displayName: getGameModeDisplayName(gm),
}));

// For Single Player, this is the total number of questions to be answered.
export const SINGLE_PLAYER_TARGET_SCORE = 10; 
export const MULTIPLAYER_QUESTIONS_PER_PLAYER = 5;
// MAX_ALLOWED_INCORRECT_ANSWERS is no longer used for game-ending logic in Single Player.
// It could be reintroduced for visual feedback (e.g., "lives") if desired later.

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

export const FEEDBACK_DELAY_MS = 1500; // 1.5 seconds