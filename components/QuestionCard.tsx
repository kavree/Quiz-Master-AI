import React from 'react';
import { QuizQuestion } from '../types';
import AnswerButton from './AnswerButton';
import { T, getCategoryDisplayName, getDifficultyDisplayName } from '../localization';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (selectedAnswer: string) => void;
  isAnswerRevealed: boolean;
  selectedAnswer?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, isAnswerRevealed, selectedAnswer }) => {
  const categoryDisplay = getCategoryDisplayName(question.category);
  const difficultyDisplay = getDifficultyDisplayName(question.difficulty);
  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-neutral-500 mb-3">
          <span className="py-1 px-2 bg-sky-100 text-sky-700 rounded-md text-xs font-medium">{T.categoryLabel} {categoryDisplay}</span>
          <span className="py-1 px-2 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">{T.difficultyLabel} {difficultyDisplay}</span>
        </div>
        <h2 
            className="text-xl md:text-2xl font-semibold text-neutral-800 leading-tight"
            dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            text={option}
            onClick={() => onAnswer(option)}
            disabled={isAnswerRevealed}
            isSelected={option === selectedAnswer}
            isCorrect={isAnswerRevealed ? option === question.correctAnswer : undefined}
            optionPrefix={optionPrefixes[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;