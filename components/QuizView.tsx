import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../types';
import { CheckIcon, XIcon } from './Icons';

interface QuizViewProps {
  questions: QuizQuestion[];
}

export const QuizView: React.FC<QuizViewProps> = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return questions.reduce((acc, question, index) => {
      return userAnswers[index] === question.correctAnswerIndex ? acc + 1 : acc;
    }, 0);
  }, [isSubmitted, questions, userAnswers]);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  
  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  }

  if (questions.length === 0) {
    return <p className="text-gray-400 text-center py-8">퀴즈를 생성하면 여기에 표시됩니다.</p>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-blue-400 mb-4">퀴즈 시간!</h3>
      {isSubmitted && (
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6 text-center">
          <h4 className="text-xl font-bold">점수: {questions.length}점 만점에 {score}점</h4>
        </div>
      )}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-gray-900/50 p-4 rounded-lg">
            <p className="font-semibold text-lg mb-3">{qIndex + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => {
                const isSelected = userAnswers[qIndex] === oIndex;
                const isCorrect = q.correctAnswerIndex === oIndex;
                
                let optionClass = 'bg-gray-700 hover:bg-gray-600';
                if (isSubmitted) {
                    if (isCorrect) {
                        optionClass = 'bg-green-800/80';
                    } else if (isSelected && !isCorrect) {
                        optionClass = 'bg-red-800/80';
                    }
                } else if (isSelected) {
                    optionClass = 'bg-blue-800/80 ring-2 ring-blue-500';
                }

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswerSelect(qIndex, oIndex)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center justify-between ${optionClass}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && (isCorrect ? <CheckIcon/> : (isSelected ? <XIcon/> : null))}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {!isSubmitted ? (
            <button 
                onClick={handleSubmit} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={Object.keys(userAnswers).length !== questions.length}
            >
                정답 제출
            </button>
        ) : (
             <button 
                onClick={handleReset} 
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
                다시 풀기
            </button>
        )}
      </div>
    </div>
  );
};