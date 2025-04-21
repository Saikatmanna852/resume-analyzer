import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { useAnalyzer } from '../hooks/useAnalyzer';

export const ResumeUploader: React.FC = () => {
  const { setResumeText, setHasAnalyzed } = useAnalyzer();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    
    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setFileName(file.name);
    setHasAnalyzed(false);
    
    // Simulate PDF text extraction
    // In a real implementation, we would use a PDF parsing library
    setTimeout(() => {
      // This is a mock - in a real app we'd extract text from the PDF
      const mockResumeText = `
        John Doe
        Software Engineer
        
        SKILLS
        JavaScript, React, TypeScript, Node.js, Python
        
        EXPERIENCE
        Senior Software Engineer
        XYZ Tech Company
        Developed frontend applications using React and TypeScript.
        
        Software Developer
        ABC Solutions
        Built RESTful APIs using Node.js and Express.
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology
      `;
      
      setResumeText(mockResumeText);
    }, 1000);
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setResumeText('');
    setError(null);
    setHasAnalyzed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-medium text-gray-800 mb-4">Upload Resume</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      
      {!fileName ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            Drag & drop your resume or <span className="text-blue-600">browse</span>
          </p>
          <p className="text-sm text-gray-500">Supports PDF files only</p>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept=".pdf" 
            onChange={handleFileInputChange}
          />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-gray-700 truncate max-w-xs">{fileName}</span>
          </div>
          <button 
            onClick={handleRemoveFile}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
};