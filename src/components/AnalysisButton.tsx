import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { useAnalyzer } from '../hooks/useAnalyzer';

export const AnalysisButton: React.FC = () => {
  const { 
    resumeText, 
    jobDescription, 
    requiredSkills, 
    analyzeResume,
    hasAnalyzed
  } = useAnalyzer();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis taking time
    setTimeout(() => {
      analyzeResume();
      setIsAnalyzing(false);
    }, 1500);
  };

  const isDisabled = !resumeText || !jobDescription || requiredSkills.length === 0 || isAnalyzing || hasAnalyzed;

  return (
    <button
      onClick={handleAnalyze}
      disabled={isDisabled}
      className={`w-full py-3 px-4 flex items-center justify-center rounded-md text-white font-medium transition-all shadow-md
        ${isDisabled 
          ? 'bg-gray-400 cursor-not-allowed opacity-70' 
          : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5'
        }`}
    >
      {isAnalyzing ? (
        <>
          <Loader className="animate-spin h-5 w-5 mr-2" />
          Analyzing Resume...
        </>
      ) : hasAnalyzed ? (
        'Analysis Complete'
      ) : (
        <>
          <Search className="h-5 w-5 mr-2" />
          Analyze Resume
        </>
      )}
    </button>
  );
};