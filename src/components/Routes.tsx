import React, { useEffect, useState } from 'react';
import { Home } from './Home';
import { History } from './History';

export const Routes: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.replace('#', ''));
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial route

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  switch(currentRoute) {
    case 'history':
      return <History />;
    default:
      return <Home />;
  }
};