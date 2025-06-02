
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { QuizQuestion, Category, Difficulty } from '../types';
import { GEMINI_MODEL_TEXT } from '../constants';
import { T, getCategoryDisplayName, getDifficultyDisplayName } from '../localization';

const API_KEY = process.env.API_KEY;

function parseGeminiResponse(responseText: string, category: Category, difficulty: Difficulty): QuizQuestion | null {
  let jsonStr = responseText.trim();
  // Using the regex structure provided in @google/genai documentation
  // The documentation suggests: /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
  // And then using match[2] for the content.
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) { // Use match[2] as per documentation example for the content
    jsonStr = match[2].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    if (
      parsed &&
      typeof parsed.question === 'string' &&
      Array.isArray(parsed.options) &&
      parsed.options.length === 4 &&
      parsed.options.every((opt: unknown) => typeof opt === 'string') &&
      typeof parsed.correctAnswer === 'string' &&
      parsed.options.includes(parsed.correctAnswer)
    ) {
      return {
        question: parsed.question,
        options: parsed.options,
        correctAnswer: parsed.correctAnswer,
        category: category, // Store the enum value, not the display name
        difficulty: difficulty, // Store the enum value
      };
    }
    console.error("Parsed JSON does not match QuizQuestion structure:", parsed);
    return null;
  } catch (error) {
    console.error("Failed to parse JSON response from Gemini:", error);
    console.error("Original response text (input to parseGeminiResponse):", responseText);
    console.error("Processed jsonStr (attempted to parse):", jsonStr);
    return null;
  }
}

export async function fetchQuizQuestion(
  category: Category,
  difficulty: Difficulty,
  previousQuestions: string[] = []
): Promise<QuizQuestion> {
  const categoryDisplay = getCategoryDisplayName(category);
  const difficultyDisplay = getDifficultyDisplayName(difficulty);

  if (!API_KEY) {
    console.warn("API_KEY is not configured. Serving a mock question in Thai.");
    return Promise.resolve({
        question: T.mockQuestionText(categoryDisplay, difficultyDisplay),
        options: T.mockQuestionOptions,
        correctAnswer: T.mockQuestionAnswer,
        category: category,
        difficulty: difficulty,
    });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const previousQuestionsText = previousQuestions.length > 0
    ? `\n${T.geminiPromptPreviousQuestionsHeader}\n- ${previousQuestions.join("\n- ")}\n`
    : "";

  const systemInstruction = T.geminiPromptSystemInstruction;
  
  const userPrompt = `
หมวดหมู่: ${category === Category.RANDOM ? T.geminiPromptRandomCategoryName : categoryDisplay}
ระดับความยาก: ${difficultyDisplay}
${previousQuestionsText}
${T.geminiPromptOutputFormatInstruction}
${T.geminiPromptJsonStructureExample}

${T.geminiPromptEnsureCorrectAnswerInOptions}
${T.geminiPromptEnsureFourDistinctOptions}
${T.geminiPromptEngagingAndClear}
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: difficulty === Difficulty.HARD ? 0.9 : (difficulty === Difficulty.MEDIUM ? 0.7 : 0.5),
      },
    });
    
    const parsedQuestion = parseGeminiResponse(response.text, category, difficulty);
    if (parsedQuestion) {
      return parsedQuestion;
    } else {
      // If parsing fails, try to return a structured error or a more graceful fallback.
      console.error("Gemini response parsing failed. Response text from API:", response.text);
      throw new Error("ไม่สามารถประมวลผลคำถามจาก AI ได้ โปรดลองอีกครั้ง");
    }
  } catch (error) {
    console.error("Error fetching question from Gemini API:", error);
    // Fallback to mock question on API error to keep game playable for demo
     if (error instanceof Error && (error.message.includes("API key not valid") || error.message.includes("Quota"))) {
        console.warn("API key error or quota issue. Serving a mock question.");
         return Promise.resolve({
            question: T.mockQuestionText(categoryDisplay, difficultyDisplay) + " (API Error)",
            options: T.mockQuestionOptions,
            correctAnswer: T.mockQuestionAnswer,
            category: category,
            difficulty: difficulty,
        });
    }
    throw new Error(`ไม่สามารถดึงคำถามได้: ${error instanceof Error ? error.message : String(error)}`);
  }
}
