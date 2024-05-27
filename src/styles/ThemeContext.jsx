import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

const lightTheme = {
  background: '#ffffff',
  color: '#000000',
};

const darkTheme = {
  background: '#000000',
  color: '#ffffff',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    console.log('Toggle theme');
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
