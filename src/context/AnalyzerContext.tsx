import React, { createContext, useState, useEffect } from 'react';
import { AnalysisResult, KeywordMatch, SkillMatch } from '../types';

interface AnalyzerContextType {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  requiredSkills: string[];
  setRequiredSkills: (skills: string[]) => void;
  skillMatches: SkillMatch[];
  keywordMatches: KeywordMatch[];
  matchPercentage: number;
  hasAnalyzed: boolean;
  setHasAnalyzed: (analyzed: boolean) => void;
  analyzeResume: () => void;
  saveAnalysis: () => void;
  analysisHistory: AnalysisResult[];
  loadAnalysis: (index: number) => void;
  deleteAnalysis: (index: number) => void;
}

export const AnalyzerContext = createContext<AnalyzerContextType>({
  resumeText: '',
  setResumeText: () => {},
  jobDescription: '',
  setJobDescription: () => {},
  jobTitle: '',
  setJobTitle: () => {},
  requiredSkills: [],
  setRequiredSkills: () => {},
  skillMatches: [],
  keywordMatches: [],
  matchPercentage: 0,
  hasAnalyzed: false,
  setHasAnalyzed: () => {},
  analyzeResume: () => {},
  saveAnalysis: () => {},
  analysisHistory: [],
  loadAnalysis: () => {},
  deleteAnalysis: () => {},
});

export const AnalyzerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  const [skillMatches, setSkillMatches] = useState<SkillMatch[]>([]);
  const [keywordMatches, setKeywordMatches] = useState<KeywordMatch[]>([]);
  const [matchPercentage, setMatchPercentage] = useState(0);
  
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  
  useEffect(() => {
    const savedHistory = localStorage.getItem('analysisHistory');
    if (savedHistory) {
      try {
        setAnalysisHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse analysis history:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    if (analysisHistory.length > 0) {
      localStorage.setItem('analysisHistory', JSON.stringify(analysisHistory));
    }
  }, [analysisHistory]);
  
  const analyzeResume = () => {
    if (!resumeText || !jobDescription || requiredSkills.length === 0) return;
    
    const lowerCaseResume = resumeText.toLowerCase();
    
    // Case-insensitive skill matching
    const skillMatchResults = requiredSkills.map(skill => ({
      name: skill,
      found: lowerCaseResume.includes(skill.toLowerCase())
    }));
    
    // Case-insensitive keyword extraction and matching
    const importantKeywords = extractKeywords(jobDescription);
    const keywordResults = importantKeywords.map(keyword => {
      const lowerCaseKeyword = keyword.toLowerCase();
      const regex = new RegExp(lowerCaseKeyword, 'gi');
      const frequency = (lowerCaseResume.match(regex) || []).length;
      
      const relevance = Math.min(10, Math.max(1, 
        Math.round((frequency + 1) * (keyword.length > 3 ? 2 : 1))
      ));
      
      return {
        term: keyword,
        frequency,
        relevance
      };
    });
    
    const skillMatchRate = skillMatchResults.filter(skill => skill.found).length / skillMatchResults.length;
    const keywordRelevance = keywordResults.reduce((sum, keyword) => sum + keyword.relevance, 0) / 
                            (keywordResults.length * 10);
    
    const overallScore = Math.round((skillMatchRate * 0.7 + keywordRelevance * 0.3) * 100);
    
    setSkillMatches(skillMatchResults);
    setKeywordMatches(keywordResults);
    setMatchPercentage(overallScore);
    setHasAnalyzed(true);
  };
  
  const saveAnalysis = () => {
    if (!hasAnalyzed) return;
    
    const analysisResult: AnalysisResult = {
      timestamp: Date.now(),
      jobTitle: jobTitle || 'Untitled Position',
      resumeText,
      jobDescription,
      requiredSkills,
      skillMatches,
      keywordMatches,
      matchPercentage
    };
    
    setAnalysisHistory([analysisResult, ...analysisHistory]);
  };
  
  const loadAnalysis = (index: number) => {
    if (index >= 0 && index < analysisHistory.length) {
      const analysis = analysisHistory[index];
      
      setResumeText(analysis.resumeText);
      setJobTitle(analysis.jobTitle);
      setJobDescription(analysis.jobDescription);
      setRequiredSkills(analysis.requiredSkills);
      setSkillMatches(analysis.skillMatches);
      setKeywordMatches(analysis.keywordMatches);
      setMatchPercentage(analysis.matchPercentage);
      setHasAnalyzed(true);
    }
  };
  
  const deleteAnalysis = (index: number) => {
    if (index >= 0 && index < analysisHistory.length) {
      const updatedHistory = [...analysisHistory];
      updatedHistory.splice(index, 1);
      setAnalysisHistory(updatedHistory);
      localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
    }
  };
  
  const extractKeywords = (text: string): string[] => {
    if (!text) return [];
    
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of']);
    
    const wordFrequency: Record<string, number> = {};
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });
    
    return Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word);
  };
  
  return (
    <AnalyzerContext.Provider
      value={{
        resumeText,
        setResumeText,
        jobDescription,
        setJobDescription,
        jobTitle,
        setJobTitle,
        requiredSkills,
        setRequiredSkills,
        skillMatches,
        keywordMatches,
        matchPercentage,
        hasAnalyzed,
        setHasAnalyzed,
        analyzeResume,
        saveAnalysis,
        analysisHistory,
        loadAnalysis,
        deleteAnalysis
      }}
    >
      {children}
    </AnalyzerContext.Provider>
  );
};