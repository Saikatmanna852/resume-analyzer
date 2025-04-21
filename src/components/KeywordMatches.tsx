import React from 'react';
import { ArrowUpCircle, MinusCircle, ArrowDownCircle } from 'lucide-react';
import { KeywordMatch } from '../types';

interface KeywordMatchesProps {
  keywordMatches: KeywordMatch[];
}

export const KeywordMatches: React.FC<KeywordMatchesProps> = ({ keywordMatches }) => {
  // Sort keywords by relevance score
  const sortedKeywords = [...keywordMatches].sort((a, b) => b.relevance - a.relevance);
  
  const getRelevanceIcon = (relevance: number) => {
    if (relevance > 7) return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
    if (relevance > 4) return <MinusCircle className="h-4 w-4 text-yellow-500" />;
    return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
  };
  
  return (
    <div>
      <h4 className="font-medium text-gray-800 mb-3">Key Terms</h4>
      
      <div className="overflow-hidden rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relevance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedKeywords.slice(0, 5).map((keyword, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{keyword.term}</div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{keyword.frequency}x</div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRelevanceIcon(keyword.relevance)}
                    <span className="ml-1.5 text-sm text-gray-600">{keyword.relevance}/10</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};