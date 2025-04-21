import React from 'react';
import { ScoreCircle } from './ScoreCircle';
import { SkillsMatch } from './SkillsMatch';
import { KeywordMatches } from './KeywordMatches';
import { Download, Save } from 'lucide-react';
import { useAnalyzer } from '../hooks/useAnalyzer';

export const ResultsDisplay: React.FC = () => {
  const { 
    matchPercentage, 
    skillMatches, 
    keywordMatches,
    saveAnalysis
  } = useAnalyzer();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">Resume Analysis Results</h3>
        <p className="opacity-90">Here's how your resume matches the job requirements</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <ScoreCircle percentage={matchPercentage} />
          <h4 className="text-lg font-medium mt-4">ATS Match Score</h4>
          <p className="text-gray-600 text-sm mt-1">
            {matchPercentage >= 70 
              ? 'Great match! Your resume aligns well with this job.'
              : matchPercentage >= 50 
                ? 'Good match, but room for improvement.'
                : 'Consider updating your resume to better match this job.'}
          </p>
        </div>
        
        <div className="space-y-6">
          <SkillsMatch skillMatches={skillMatches} />
          <KeywordMatches keywordMatches={keywordMatches} />
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md flex items-center justify-center transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button 
            onClick={saveAnalysis}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Analysis
          </button>
        </div>
      </div>
    </div>
  );
};