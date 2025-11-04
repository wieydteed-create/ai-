import React from 'react';

interface SummaryViewProps {
  summary: string;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => {
  if (!summary) {
    return <p className="text-gray-400 text-center py-8">요약본을 생성하면 여기에 표시됩니다.</p>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-blue-400 mb-4">요약</h3>
      <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-gray-200 whitespace-pre-wrap">
        {summary}
      </div>
    </div>
  );
};