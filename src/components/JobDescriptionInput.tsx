import React from 'react';
import { Briefcase } from 'lucide-react';
import { useAnalyzer } from '../hooks/useAnalyzer';

export const JobDescriptionInput: React.FC = () => {
  const { jobDescription, setJobDescription, jobTitle, setJobTitle, setHasAnalyzed } = useAnalyzer();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setHasAnalyzed(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
    setHasAnalyzed(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-medium text-gray-800 mb-4">Job Details</h3>
      
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={handleTitleChange}
            placeholder="E.g., Software Engineer, Product Manager"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
        Job Description
      </label>
      <textarea
        id="jobDescription"
        value={jobDescription}
        onChange={handleDescriptionChange}
        placeholder="Paste the full job description here..."
        rows={6}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
      />
    </div>
  );
};