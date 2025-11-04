import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'summary', label: '요약' },
    { id: 'quiz', label: '퀴즈' },
    { id: 'flashcards', label: '플래시카드' },
  ];

  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }
              transition-colors duration-200 focus:outline-none
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};