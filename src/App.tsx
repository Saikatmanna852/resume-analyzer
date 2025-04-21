import React from 'react';
import { Layout } from './components/Layout';
import { AnalyzerProvider } from './context/AnalyzerContext';
import { Routes } from './components/Routes';

function App() {
  return (
    <AnalyzerProvider>
      <Layout>
        <Routes />
      </Layout>
    </AnalyzerProvider>
  );
}

export default App;