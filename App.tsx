import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { SummaryView } from './components/SummaryView';
import { QuizView } from './components/QuizView';
import { FlashcardView } from './components/FlashcardView';
import { Loader } from './components/Loader';
import { generateSummary, generateQuiz, generateFlashcards } from './services/geminiService';
import { QuizQuestion, Flashcard, Tab } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingType, setLoadingType] = useState<Tab | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<string>('');
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const hasGeneratedContent = summary || quiz.length > 0 || flashcards.length > 0;

  const handleGenerate = useCallback(async (generationType: Tab) => {
    if (!inputText.trim()) {
      setError('시작하려면 텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setLoadingType(generationType);
    setError(null);
    
    // Clear previous results when generating new content
    setSummary('');
    setQuiz([]);
    setFlashcards([]);
    
    try {
      if (generationType === 'summary') {
        const result = await generateSummary(inputText);
        setSummary(result);
      } else if (generationType === 'quiz') {
        const result = await generateQuiz(inputText);
        setQuiz(result);
      } else if (generationType === 'flashcards') {
        const result = await generateFlashcards(inputText);
        setFlashcards(result);
      }
      setActiveTab(generationType);
    } catch (e: any) {
      setError(`콘텐츠 생성 실패: ${e.message}`);
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  }, [inputText]);

  const renderContent = () => {
    if (isLoading && !hasGeneratedContent) return <Loader />;
    
    switch (activeTab) {
      case 'summary':
        return <SummaryView summary={summary} />;
      case 'quiz':
        return <QuizView questions={quiz} />;
      case 'flashcards':
        return <FlashcardView flashcards={flashcards} />;
      default:
        return null;
    }
  };

  const generationButtons: { type: Tab; label: string }[] = [
    { type: 'summary', label: '요약 생성' },
    { type: 'quiz', label: '퀴즈 생성' },
    { type: 'flashcards', label: '플래시카드 생성' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-6">
            <div className="mb-4">
               <h2 className="text-xl font-bold text-blue-400 mb-2">텍스트 입력</h2>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="요약, 퀴즈 생성, 또는 플래시카드 제작을 위해 텍스트를 여기에 붙여넣으세요..."
                className="w-full h-48 p-4 bg-gray-900 border-2 border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-y"
              />
            </div>
             <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
               {generationButtons.map(({ type, label }) => (
                 <button
                    key={type}
                    onClick={() => handleGenerate(type)}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full sm:w-auto flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex justify-center items-center"
                  >
                    {isLoading && loadingType === type ? <Loader small={true} /> : label}
                  </button>
               ))}
            </div>
          </div>
          
          {error && <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md">{error}</div>}
          
          {(isLoading && !hasGeneratedContent) && <div className="mt-8 bg-gray-800 rounded-lg shadow-2xl p-6"><Loader/></div>}

          {hasGeneratedContent && (
             <div className="mt-8 bg-gray-800 rounded-lg shadow-2xl">
              <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="p-6">
                {renderContent()}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
