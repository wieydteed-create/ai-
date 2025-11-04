import React from 'react';
import { SummarizeIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <SummarizeIcon />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          AI 요약기
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        텍스트를 지능적으로 요약하고 핵심을 파악하세요.
      </p>
    </header>
  );
};