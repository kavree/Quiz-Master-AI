
export enum GameMode {
  SINGLE_PLAYER = 'Single Player',
  MULTIPLAYER = 'Multiplayer',
  PRACTICE = 'Practice',
}

export enum Category {
  SCIENCE = 'Science',
  GENERAL_KNOWLEDGE = 'General Knowledge',
  MATHEMATICS = 'Mathematics',
  HISTORY = 'History',
  ENGLISH = 'English',
  RANDOM = 'Random',
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  category: Category;
  difficulty: Difficulty;
}

export interface Player {
  id: number;
  score: number;
}

export enum GameState {
  START_SCREEN = 'START_SCREEN',
  IN_GAME = 'IN_GAME',
  GAME_OVER = 'GAME_OVER',
}

export interface GameSettings {
  mode: GameMode;
  category: Category;
  difficulty: Difficulty;
}
