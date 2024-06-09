
import React, { createContext, useContext, useState } from 'react';

// Create the contexto
const ErrorContext = createContext();

// Create the provider for the contet
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  console.log(error)
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Create a hook to use the context
export const useErrorContext = () => {
  return useContext(ErrorContext);
};