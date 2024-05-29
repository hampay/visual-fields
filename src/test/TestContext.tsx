import { createContext, useState, useContext, useEffect, FC, ReactNode } from 'react';

type OpacityResult = {
    opacity: number;
    passed: boolean;
};

export interface DotRecord {
    id: number;
    opacity: number;
    testPassed: boolean | null; // null means the dot hasn't been tested yet
    testedOpacities: OpacityResult[]; // New property
}
export const eyeOptions = ['left', 'right', 'both'] as const;
type EyeOptions = typeof eyeOptions[number] | null;
interface TestContextType {
    dots: DotRecord[];
    activeDotId: number;
    activeDot: DotRecord | undefined;
    startNextTest: () => void;
    recordResponse: (opacity: number, response: boolean) => void;
    numColumns: number;
    totalDots: number;
    testTime: number;
    testingEye: EyeOptions;
    setTestingEye: (eye: EyeOptions) => void;
    testStarted: boolean
    testFinished: boolean
    startTest: () => void;
    resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [dots, setDots] = useState<DotRecord[]>([]);
    const [activeDotId, setActiveDotId] = useState<number>(-1);
    const [testingEye, setTestingEye] = useState<EyeOptions>(null);

    const testStarted = dots.some(dot => dot.testedOpacities.length > 0);
    const testFinished = dots.every(dot => dot.testPassed !== null);
    
    // const numColumns = 17;
    const totalDots = 153;
    const numColumns = 5;
    // const totalDots = 25;
    const testTime = 4;

    const startingOpacity = 0.5;

    useEffect(() => {
        initializeDots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initializeDots = () => {
        
        const dotsArray: DotRecord[] = [];
        for (let i = 0; i < totalDots; i++) {
            dotsArray.push({ id: i, testedOpacities: [], opacity: startingOpacity, testPassed: null});
        }
        setDots(dotsArray);

    };

    const findNextDot = () => {
        const untestedDots = dots.filter(dot => dot.testPassed === null);
        return untestedDots.length ? untestedDots[Math.floor(Math.random() * untestedDots.length)].id : undefined;
    };

    const startNextTest = () => {
        const nextDotId = findNextDot()
        if (nextDotId === undefined) {
            //TODO - handle end of test
            console.log('end of test', dots)
        } else {
            setActiveDotId(nextDotId);
        }
    };

    const recordResponse = (opacity: number, passed: boolean) => {
        setDots(prevDots => {
            const updatedDots = [...prevDots];
            const dot = updatedDots[activeDotId];
            dot.testedOpacities.push({ opacity: roundToOneDecimal(opacity), passed });
            const nextOpacity = getNextOpacity(dot.testedOpacities);
            if (nextOpacity === null) {
                if (dot.testedOpacities.some(test => test.passed)) {
                    const lowestPass = dot.testedOpacities.filter(test => test.passed).sort((a, b) => a.opacity - b.opacity)[0];
                    dot.opacity = lowestPass.opacity;
                    dot.testPassed = true;
                } else {
                    dot.opacity = -1;
                    dot.testPassed = false;
                }
            } else {
                dot.opacity = nextOpacity;
            }
            return updatedDots;
        });
    };

    const testedOpacities = dots.reduce((acc, dot) => {
        return [...acc, ...dot.testedOpacities]
    }, [] as OpacityResult[]);
    useEffect(() => {
        if (testStarted) {
            startNextTest();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testedOpacities.length]);


    const getNextOpacity = (testedOpacities: { opacity: number; passed: boolean }[]): number | null => {
        const passes = testedOpacities.filter(test => test.passed);
        const fails = testedOpacities.filter(test => !test.passed);
        const lowestPass = passes.length ? passes.sort((a, b) => a.opacity - b.opacity)[0] : undefined;
        const highestFail = fails.length ? fails.sort((a, b) => b.opacity - a.opacity)[0] : undefined;

        if (lowestPass === undefined && highestFail === undefined) {
            return startingOpacity;
        }

        if (lowestPass === undefined && highestFail !== undefined) {
            if (highestFail.opacity === 1) {
                return null;
            } else {
                return roundToOneDecimal(highestFail.opacity + 0.1);
            }
        }

        if (highestFail === undefined && lowestPass !== undefined) {
            if (lowestPass.opacity === 0.1) {
                return null;
            } else {
                return roundToOneDecimal(lowestPass.opacity - 0.1);
            }
        }

        if (lowestPass !== undefined && highestFail !== undefined) {
            if (roundToOneDecimal(lowestPass.opacity - highestFail.opacity) === 0.1) {
                return null;
            } else {
                return roundToOneDecimal(lowestPass.opacity - 0.1);
            }
        }

        return startingOpacity
    }

    const roundToOneDecimal = (num: number): number => {
        return Math.round(num * 10) / 10;
    }    

    const startTest = () => {
        startNextTest()
    };

    const resetTest = () => {
        initializeDots();
        setActiveDotId(-1);
        setTestingEye(null);
    };

    return (
        <TestContext.Provider value={{ 
            dots, 
            activeDotId,
            activeDot: dots.find(dot => dot.id === activeDotId),
            startNextTest, 
            numColumns,
            totalDots,
            testTime,
            startTest, 
            resetTest,
            recordResponse,
            testStarted,
            testFinished,
            testingEye,
            setTestingEye
        }}>
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
