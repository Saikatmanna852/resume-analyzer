import { useContext } from 'react';
import { AnalyzerContext } from '../context/AnalyzerContext';

export const useAnalyzer = () => {
  return useContext(AnalyzerContext);
};