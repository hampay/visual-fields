// TestContext.tsx

import React, { createContext, useState, useContext, useEffect, FC, ReactNode } from 'react';

export interface DotRecord {
  id: number;
  testPassed: boolean | null;
  opacity: number;
}

interface TestResult {
  dotId: number;
  opacity: number;
  response: boolean;
}

interface TestContextType {
  dots: DotRecord[];
  testingOrder: number[];
  activeDot: number;
  testResults: TestResult[];
  startNextTest: () => void;
  recordResponse: (response: boolean) => void;
  numColumns: number;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [dots, setDots] = useState<DotRecord[]>([]);
  const [testingOrder, setTestingOrder] = useState<number[]>([]);
  const [activeDot, setActiveDot] = useState<number>(-1);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [lastOpacity, setLastOpacity] = useState<number | null>(null);
  const numColumns = 11; // Adjust as needed

  // Create dot records with unique IDs
  useEffect(() => {
    const totalDots = 99; // Adjust as needed
    const dotsArray: DotRecord[] = [];
    for (let i = 0; i < totalDots; i++) {
      dotsArray.push({ id: i, testPassed: null, opacity: 1 });
    }
    setDots(dotsArray);

    // Create testing order
    const order = Array.from({ length: totalDots }, (_, i) => i);
    setTestingOrder(shuffle(order));
  }, []);

  // Shuffle function
  const shuffle = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Start test with the first untested dot
  useEffect(() => {
    const nextDotIndex = testingOrder.findIndex(dotId => dots[dotId].testPassed === null);
    setActiveDot(testingOrder[nextDotIndex]);
    setLastOpacity(null);
  }, [testingOrder, dots]);

  // Start the next test with the next untested dot
  const startNextTest = () => {
    const nextDotIndex = testingOrder.findIndex(dotId => dots[dotId].testPassed === null);
    setActiveDot(testingOrder[nextDotIndex]);
    setLastOpacity(null);
  };

  // Record user response and update test results
  const recordResponse = (response: boolean) => {
    if (lastOpacity !== null && activeDot !== -1) {
      setTestResults([...testResults, { dotId: activeDot, opacity: lastOpacity, response }]);
      const updatedDots = [...dots];
      updatedDots[activeDot].testPassed = response;
      setDots(updatedDots);
    }
    setLastOpacity(getNextOpacity());
  };

  // Placeholder function to get next opacity
  const getNextOpacity = () => {
    // Implement your logic here to get the next opacity
    return 0.5; // Placeholder value
  };

  return (
    <TestContext.Provider value={{ dots, testingOrder, activeDot, testResults, startNextTest, recordResponse, numColumns }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
};
