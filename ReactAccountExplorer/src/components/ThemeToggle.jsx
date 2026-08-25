import { useEffect, useState } from 'react';

// null = follow the system preference; 'light' / 'dark' = user override.
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  return saved === 'light' || saved === 'dark' ? saved : null;
}

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } else {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    }
  }, [theme]);

  const isDark = theme ? theme === 'dark' : systemPrefersDark();

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        // Sun
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="7" y2="7" />
          <line x1="17" y1="17" x2="19.1" y2="19.1" />
          <line x1="4.9" y1="19.1" x2="7" y2="17" />
          <line x1="17" y1="7" x2="19.1" y2="4.9" />
        </svg>
      ) : (
        // Moon
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
