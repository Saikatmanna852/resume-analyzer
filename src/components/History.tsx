import React from 'react';
import { useAnalyzer } from '../hooks/useAnalyzer';
import { ChevronRight, Trash2 } from 'lucide-react';

export const History: React.FC = () => {
  const { analysisHistory, loadAnalysis, deleteAnalysis } = useAnalyzer();

  if (analysisHistory.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analysis History</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-4">You haven't analyzed any resumes yet.</p>
          <a 
            href="#"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '';
            }}
          >
            Get Started
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analysis History</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {analysisHistory.map((item, index) => (
            <li key={index} className="hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {item.jobTitle || 'Untitled Analysis'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Analyzed on {new Date(item.timestamp).toLocaleDateString()}
                    {' • '}
                    Match Score: {item.matchPercentage}%
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteAnalysis(index)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Delete analysis"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      loadAnalysis(index);
                      window.location.hash = '';
                    }}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="View analysis"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};