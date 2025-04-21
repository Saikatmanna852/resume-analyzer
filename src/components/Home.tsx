import React from 'react';
import { ResumeUploader } from './ResumeUploader';
import { JobDescriptionInput } from './JobDescriptionInput';
import { SkillsInput } from './SkillsInput';
import { AnalysisButton } from './AnalysisButton';
import { ResultsDisplay } from './ResultsDisplay';
import { useAnalyzer } from '../hooks/useAnalyzer';

export const Home: React.FC = () => {
  const { resumeText, hasAnalyzed } = useAnalyzer();

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        ATS Resume Score Analyzer
      </h2>
      
      <p className="text-gray-600 mb-8">
        Upload your resume and input job details to see how well your resume matches the job requirements.
        Our tool analyzes your resume against ATS algorithms to improve your chances of getting noticed.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ResumeUploader />
          <JobDescriptionInput />
          <SkillsInput />
          <AnalysisButton />
        </div>
        
        <div className={`transition-all duration-500 ${resumeText && hasAnalyzed ? 'opacity-100' : 'opacity-0'}`}>
          {resumeText && hasAnalyzed && <ResultsDisplay />}
        </div>
      </div>
    </div>
  );
};