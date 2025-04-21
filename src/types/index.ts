export interface SkillMatch {
  name: string;
  found: boolean;
}

export interface KeywordMatch {
  term: string;
  frequency: number;
  relevance: number; // 1-10 scale
}

export interface AnalysisResult {
  timestamp: number;
  jobTitle: string;
  resumeText: string;
  jobDescription: string;
  requiredSkills: string[];
  skillMatches: SkillMatch[];
  keywordMatches: KeywordMatch[];
  matchPercentage: number;
}