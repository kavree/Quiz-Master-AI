import React from 'react';
import { CheckIcon, XMarkIcon } from './icons';

interface AnswerButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  isCorrect?: boolean; 
  isSelected?: boolean;
  optionPrefix: string; // A, B, C, D
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ text, onClick, disabled, isCorrect, isSelected, optionPrefix }) => {
  let buttonStyle = "bg-white hover:bg-sky-50 text-neutral-700 border border-slate-300";
  let icon = null;
  let prefixStyle = "text-sky-600";

  if (typeof isCorrect !== 'undefined') { // Answer revealed
    if (isCorrect) {
      buttonStyle = "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600";
      icon = <CheckIcon className="w-5 h-5 ml-2 text-white" />;
      prefixStyle = "text-white";
    } else if (isSelected && !isCorrect) {
      buttonStyle = "bg-red-500 hover:bg-red-600 text-white border-red-600";
      icon = <XMarkIcon className="w-5 h-5 ml-2 text-white" />;
      prefixStyle = "text-white";
    } else { 
      buttonStyle = "bg-slate-200 text-slate-500 border-slate-300 opacity-70";
      prefixStyle = "text-slate-500";
    }
  } else if (isSelected && disabled) { // Selected but not yet revealed (user clicked)
      buttonStyle = "bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] text-white ring-2 ring-offset-1 ring-purple-400 border-transparent";
      prefixStyle = "text-white";
  }


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center p-3 sm:p-4 rounded-xl shadow-md text-left transition-all duration-200 ease-in-out transform active:scale-95 ${buttonStyle}`}
    >
      <span className={`font-semibold mr-2 ${prefixStyle}`}>{optionPrefix}.</span>
      <span className="flex-grow" dangerouslySetInnerHTML={{ __html: text }}></span>
      {icon}
    </button>
  );
};

export default AnswerButton;