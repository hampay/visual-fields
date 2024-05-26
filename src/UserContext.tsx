import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextType {
  testStarted: boolean;
  setTestStarted: (started: boolean) => void;
  testResults: any; // Define a proper type based on your results structure
  setTestResults: (results: any) => void;
}

export const useUserContext = () => useContext(UserContext);

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [testResults, setTestResults] = useState(null);

  return (
    <UserContext.Provider value={{ testStarted, setTestStarted, testResults, setTestResults }}>
      {children}
    </UserContext.Provider>
  );
};
