import { Category, Difficulty } from '../types';

export const th = {
  // General
  gameTitle: "Quiz Master AI", // Changed to English to match new logo style, can be bilingual
  startScreenTagline: "ทดสอบความรู้ของคุณ ท้าทาย AI อัจฉริยะ!",
  startGame: "เริ่มเกม",
  playAgain: "เล่นอีกครั้ง",
  restartGame: "เริ่มเกมใหม่", // Kept for internal logic if any, UI might use "Back to Home"
  backToHome: "กลับหน้าหลัก",
  loadingQuestion: "กำลังสร้างคำถาม...",
  errorOccurred: "เกิดข้อผิดพลาด!",
  errorApiKeyOrNetwork: "อาจเกิดจากปัญหา API key หรือเครือข่าย",
  errorMockQuestionInfo: "คำถามตัวอย่างจะแสดงหาก API key ไม่ถูกต้อง ตั้งค่า API_KEY เพื่อรับคำถามจริงจาก AI",
  correct: "ถูกต้อง!",
  incorrect: "ผิด!",
  correctAnswerWas: "คำตอบที่ถูกต้องคือ:",
  questionLabel: "คำถามที่",
  scoreLabel: "คะแนน", // General score label, might be less used now for SP specific
  shareScore: "แชร์ผลลัพธ์",
  shareScoreCopied: "คัดลอกผลลัพธ์ไปยังคลิปบอร์ดแล้ว!",
  shareScoreNotPossible: "ไม่สามารถแชร์ผลลัพธ์หรือคัดลอกไปยังคลิปบอร์ดบนเบราว์เซอร์นี้ได้",
  
  // Game Modes
  singlePlayer: "เล่นคนเดียว",
  multiplayer: "เล่น 2 คน",
  practice: "โหมดฝึกซ้อม",
  gameModeLabel: "เลือกโหมดเกม:",

  // Categories
  science: "วิทยาศาสตร์",
  generalKnowledge: "ความรู้รอบตัว",
  mathematics: "คณิตศาสตร์",
  history: "ประวัติศาสตร์",
  english: "ภาษาอังกฤษ",
  random: "สุ่มหมวดหมู่",
  categoryLabel: "เลือกหมวดหมู่:",
  categoryIconScience: "⚛️",
  categoryIconGeneralKnowledge: "🧠",
  categoryIconMathematics: "🧮",
  categoryIconHistory: "📜",
  categoryIconEnglish: "🗣️",
  categoryIconRandom: "❓",

  // Difficulties
  easy: "ง่าย",
  medium: "ปานกลาง",
  hard: "ยาก",
  difficultyLabel: "เลือกระดับความยาก:",
  difficultyDescriptionEasy: "คำถามพื้นฐาน ชิลๆ",
  difficultyDescriptionMedium: "ท้าทายขึ้นมาอีกขั้น",
  difficultyDescriptionHard: "สำหรับจอมยุทธ์ควิซ",

  // ScoreBoard specific
  player1: "ผู้เล่น 1",
  player2: "ผู้เล่น 2",
  correctAnswersLabel: "ตอบถูก", // Used for Practice mode
  questionShortLabel: "ข้อ",
  singlePlayerScoreCorrect: "ถูก", // For Single Player score display: Correct: X
  singlePlayerScoreIncorrect: "ผิด", // For Single Player score display: Incorrect: Y


  // GameOverScreen specific
  gameOver: "จบเกม!",
  congratulations: "ยินดีด้วย!", // Generally for MP wins, SP completion will use its own title
  singlePlayerGameCompleteTitle: "สรุปผลการเล่น", // Title for SP game completion
  singlePlayerWinMessage: (score: number) => `สุดยอด! คุณตอบถูก ${score} ข้อรวด!`, // Kept for potential future use, but current SP doesn't "win" this way
  singlePlayerGameCompleteMessage: (correct: number | undefined, incorrect: number | undefined, total: number) => 
    `คุณตอบถูก ${correct ?? 0} ข้อ และตอบผิด ${incorrect ?? 0} ข้อ จากทั้งหมด ${total} ข้อ`,
  // singlePlayerLossByStrikesMessage: (incorrectCount: number) => `น่าเสียดาย! คุณตอบผิดครบ ${incorrectCount} ครั้งแล้ว ลองใหม่อีกครั้งนะ!`, // No longer used
  drawMessage: (score: number) => `เสมอ! ได้คนละ ${score} คะแนน!`,
  player1WinsMessage: (p1Score: number, p2Score: number) => `${th.player1} ชนะ! (${p1Score} ต่อ ${p2Score} คะแนน)`,
  player2WinsMessage: (p1Score: number, p2Score: number) => `${th.player2} ชนะ! (${p2Score} ต่อ ${p1Score} คะแนน)`,
  practiceSessionEnded: "ฝึกซ้อมเสร็จสิ้น",
  practiceSummary: (score: number) => `คุณตอบถูก ${score} ข้อในการฝึกซ้อม!`,

  // Gemini Prompt Related (no changes needed based on UI prompt)
  geminiPromptSystemInstruction: 'คุณเป็นผู้ช่วย AI อัจฉริยะสำหรับเกม "ควิซอัจฉริยะ AI" หน้าที่ของคุณคือสร้างคำถามปรนัย (multiple choice) ที่ไม่ซ้ำใคร เหมาะสมกับหมวดหมู่และความยากที่กำหนด คำถาม ตัวเลือก และคำตอบที่ถูกต้องทั้งหมดจะต้องเป็นภาษาไทยเท่านั้น',
  geminiPromptPreviousQuestionsHeader: 'คำถามที่เคยถามไปแล้วในเซสชันนี้ (ห้ามสร้างคำถามเหล่านี้ซ้ำหรือคล้ายคลึงกันมาก):',
  geminiPromptOutputFormatInstruction: 'โปรดตอบกลับในรูปแบบ JSON ที่ถูกต้องตามโครงสร้างนี้เท่านั้น ห้ามใส่ markdown, ข้อความเกริ่นนำ, หรือคำอธิบายใดๆ นอกเหนือจากโครงสร้าง JSON:',
  geminiPromptJsonStructureExample: `{
  "question": "สตริงคำถามภาษาไทยที่ตรงตามหมวดหมู่และความยาก",
  "options": ["สตริงตัวเลือกที่ 1 ภาษาไทย", "สตริงตัวเลือกที่ 2 ภาษาไทย", "สตริงตัวเลือกที่ 3 ภาษาไทย", "สตริงตัวเลือกที่ 4 ภาษาไทย"],
  "correctAnswer": "สตริงคำตอบที่ถูกต้องภาษาไทย (ต้องตรงกับหนึ่งใน options)"
}`,
  geminiPromptEnsureCorrectAnswerInOptions: "สำคัญ: 'correctAnswer' ต้องเป็นหนึ่งในสตริงจากอาร์เรย์ 'options' ทุกประการ",
  geminiPromptEnsureFourDistinctOptions: "สำคัญ: ต้องมี 'options' ทั้งหมด 4 ตัวเลือกที่ไม่ซ้ำกัน",
  geminiPromptEngagingAndClear: "คำถามควรกระตุ้นความสนใจ ชัดเจน และเหมาะสมกับระดับความยากที่เลือก",
  geminiPromptRandomCategoryName: "ความรู้ทั่วไปแบบสุ่ม",

  // Mock Question (no changes needed based on UI prompt)
  mockQuestionText: (categoryDisplay: string, difficultyDisplay: string) => `${categoryDisplay} (${difficultyDisplay}) - คำถาม: 2 + 2 เท่ากับเท่าใด? (API Key ไม่ถูกต้อง หรือเครือข่ายมีปัญหา - นี่คือคำถามตัวอย่าง)`,
  mockQuestionOptions: ["3", "4", "5", "6"],
  mockQuestionAnswer: "4",

  // App.tsx fallback
  appLoadingOrError: "กำลังโหลดแอปพลิเคชัน หรือเกิดสถานะที่ไม่คาดคิด",
  resetApplication: "รีเซ็ตแอปพลิเคชัน",
};