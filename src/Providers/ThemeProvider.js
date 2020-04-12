import React, { useState, createContext, useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import localStorage from 'local-storage-fallback';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const type = savedTheme ? JSON.parse(savedTheme).mode : '';

    return createMuiTheme({
      palette: {
        primary: {
          main: '#00bcd4',
          light: '#33c9dc',
          dark: '#008394',
          contrastText: '#fff',
        },
        secondary: {
          main: '#f50057',
          light: '#ec407a',
          dark: '#c51162',
          contrastText: '#fff',
        },
        type: type ? type : 'dark',
      },
    });
  }

  useEffect(() => {
    const type = theme.palette.type;
    const savedTheme = { mode: type };
    localStorage.setItem('theme', JSON.stringify(savedTheme));
    console.log(`Saved theme: ${JSON.stringify(savedTheme)}`);
  });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
