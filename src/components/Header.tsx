import React from 'react';
import { ScanSearch } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ScanSearch className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">ATS Score Analyzer</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => window.location.hash = ''}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#history" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => window.location.hash = 'history'}
              >
                History
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};