import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SkillMatch } from '../types';

interface SkillsMatchProps {
  skillMatches: SkillMatch[];
}

export const SkillsMatch: React.FC<SkillsMatchProps> = ({ skillMatches }) => {
  const matchedSkills = skillMatches.filter(skill => skill.found);
  const missingSkills = skillMatches.filter(skill => !skill.found);
  
  const matchPercentage = skillMatches.length 
    ? Math.round((matchedSkills.length / skillMatches.length) * 100) 
    : 0;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-800">Skills Match</h4>
        <span className="text-sm font-medium">
          {matchedSkills.length}/{skillMatches.length} ({matchPercentage}%)
        </span>
      </div>
      
      <div className="space-y-2">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Found in Resume</h5>
          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  {skill.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No matching skills found</p>
          )}
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Missing from Resume</h5>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  {skill.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">All required skills found!</p>
          )}
        </div>
      </div>
    </div>
  );
};