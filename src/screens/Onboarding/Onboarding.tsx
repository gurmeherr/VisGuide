import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";
import { BottomNavigation } from "../../components/BottomNavigation.tsx";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What level of vision impairment do you have?",
    options: ["Complete blindness", "Low vision", "Partial vision", "Visual field loss"]
  },
  {
    id: 2,
    question: "Which type of navigation assistance do you prefer?",
    options: ["Audio feedback", "Haptic feedback", "Combination of both", "Simple voice commands"]
  },
  {
    id: 3,
    question: "How would you like to interact with the hardware tool?",
    options: ["Single tap", "Double tap", "Long press", "Swipe gestures"]
  },
  {
    id: 4,
    question: "What is your preferred reading speed for audio feedback?",
    options: ["Slow and clear", "Normal speed", "Fast", "Adjustable speed"]
  },
  {
    id: 5,
    question: "Would you like to receive notifications about nearby obstacles?",
    options: ["Yes, always", "Yes, only when walking", "No, I prefer minimal feedback", "Customizable based on activity"]
  }
];

export const Onboarding = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Save preferences and navigate to calibration page
      localStorage.setItem('userPreferences', JSON.stringify(answers));
      navigate('/calibration');
    }
  };

  return (
    <IOSLayout>
      <div className="w-[343px] mx-auto pt-8 pb-24">
        {/* Progress Bar */}
        <div className="w-full h-2 mb-4 bg-[#2C3E50] opacity-30 rounded-full">
          <div 
            className="h-full bg-[#E74C3C] rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="w-full flex justify-between items-center mb-8">
          <span className="text-[#fbfbff] text-[13px] opacity-90">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-[#fbfbff] text-[13px] opacity-90">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        
        {/* Question */}
        <p className="text-[34px] text-[#fbfbff] leading-[46px] mb-8">
          {questions[currentQuestion].question}
        </p>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
            >
              <span className="text-[#7968ff] text-[17px] font-semibold">{option}</span>
            </button>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </IOSLayout>
  );
}; 