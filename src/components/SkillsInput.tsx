import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { useAnalyzer } from '../hooks/useAnalyzer';

export const SkillsInput: React.FC = () => {
  const { requiredSkills, setRequiredSkills, setHasAnalyzed } = useAnalyzer();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    }
  };

  const addSkill = (skill: string) => {
    if (!requiredSkills.includes(skill)) {
      setRequiredSkills([...requiredSkills, skill]);
      setHasAnalyzed(false);
    }
    setInputValue('');
  };

  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter(skill => skill !== skillToRemove));
    setHasAnalyzed(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-medium text-gray-800 mb-4">Required Skills</h3>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Tag className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add skills (e.g., React, JavaScript, Python)"
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={() => inputValue.trim() && addSkill(inputValue.trim())}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <Plus className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {requiredSkills.map((skill, index) => (
          <div 
            key={index}
            className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium flex items-center group"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {requiredSkills.length === 0 && (
          <p className="text-sm text-gray-500 italic">No skills added yet</p>
        )}
      </div>
    </div>
  );
};