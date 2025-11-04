import React, { useState } from 'react';
import { Flashcard } from '../types';
import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon } from './Icons';

interface FlashcardViewProps {
  flashcards: Flashcard[];
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const goToNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const goToPrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };
  
  if (flashcards.length === 0) {
    return <p className="text-gray-400 text-center py-8">플래시카드를 생성하면 여기에 표시됩니다.</p>;
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div>
      <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">플래시카드</h3>
      <div className="relative h-64 w-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded-lg flex items-center justify-center p-6 text-center shadow-2xl cursor-pointer">
            <p className="text-2xl font-bold">{currentCard.term}</p>
          </div>
          <div className="absolute w-full h-full backface-hidden bg-blue-700 rounded-lg flex items-center justify-center p-6 text-center shadow-2xl rotate-y-180 cursor-pointer">
            <p className="text-lg">{currentCard.definition}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6 gap-4">
        <button onClick={goToPrev} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"><ArrowLeftIcon/></button>
        <span className="font-semibold">{currentIndex + 1} / {flashcards.length}</span>
        <button onClick={goToNext} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"><ArrowRightIcon/></button>
      </div>
      <div className="text-center mt-2 text-gray-400 text-sm">
        카드를 클릭해서 뒤집으세요 <RefreshIcon />
      </div>
    </div>
  );
};

// Add this CSS to a style tag or a global CSS file for the 3D effect
const style = `
.transform-style-preserve-3d { transform-style: preserve-3d; }
.perspective-1000 { perspective: 1000px; }
.rotate-y-180 { transform: rotateY(180deg); }
.backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
`;
// Inject styles into head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = style;
document.head.appendChild(styleSheet);