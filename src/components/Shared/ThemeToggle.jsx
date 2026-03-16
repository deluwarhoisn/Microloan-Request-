import React, { useEffect, useState } from 'react';
import { BsSun, BsMoonStars } from 'react-icons/bs';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-sm btn-circle text-lg"
      aria-label="Toggle dark mode"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <BsMoonStars /> : <BsSun className="text-yellow-400" />}
    </button>
  );
};

export default ThemeToggle;