// src/components/ThemeSwitcher.jsx
import React from 'react';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="text-sm px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-80">
      {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
    </button>
  );
};

export default ThemeSwitcher;
