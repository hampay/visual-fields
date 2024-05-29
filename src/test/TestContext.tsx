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
    evaluatedEye: EyeOptions;
    setEvaluatedEye: (eye: EyeOptions) => void;
    evaluationStarted: boolean
    evaluationFinished: boolean
    startEvaluation: () => void;
    resetEvaluation: () => void;
    testActive: boolean;
    progress: number;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [dots, setDots] = useState<DotRecord[]>([]);
    const [activeDotId, setActiveDotId] = useState<number>(-1);
    const [evaluatedEye, setEvaluatedEye] = useState<EyeOptions>(null);
    const [testActive, setTestActive] = useState<boolean>(false);

    const evaluationStarted = dots.some(dot => dot.testedOpacities.length > 0);
    const evaluationFinished = dots.every(dot => dot.testPassed !== null);

    const numColumns = 13;
    const totalDots = 117;
    // const numColumns = 5;
    // const totalDots = 25;

    //TODO: Make it more sensitive – maybe combine size and opacity
    //TODO: make it faster – maybe 2 seconds – need to add more dots
    //TODO: try making the background harder to see on
    //TODO: maybe move the progress bar into the middle
    //TODO: hide the progress bar and crosshairs when the test is over
    //TODO: save the results to local storage
    //TODO: add results page with historical data
    //TODO: use historical data to determine starting opacities
    
    const testTime = 4;

    const startingOpacity = 0.2;

    useEffect(() => {
        initializeDots();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initializeDots = () => {

        const dotsArray: DotRecord[] = [];
        for (let i = 0; i < totalDots; i++) {
            dotsArray.push({ id: i, testedOpacities: [], opacity: startingOpacity, testPassed: null });
        }
        setDots(dotsArray);

    };

    const findNextDot = () => {
        const untestedDots = dots.filter(dot => dot.testPassed === null);
        return untestedDots.length ? untestedDots[Math.floor(Math.random() * untestedDots.length)].id : undefined;
    };

    const startNextTest = () => {
        setTestActive(true);
        const nextDotId = findNextDot()
        if (nextDotId === undefined) {
            //TODO - handle end of evaluation
            console.log('end of evaluation', dots)
        } else {
            setActiveDotId(nextDotId);
        }
    };

    useEffect(() => {

        if (activeDotId < 0 || !testActive) {
            return;
        }
        let timer: NodeJS.Timeout;
        timer = setTimeout(() => {
            const dot = dots.find(dot => dot.id === activeDotId);
            dot && recordResponse(dot.opacity, false);
        }, testTime * 1000);

        return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDotId, testActive])

    const recordResponse = (opacity: number, passed: boolean) => {
        if (!testActive) {
            return;
        }
        setTestActive(false)
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
        let timer: NodeJS.Timeout;
        if (evaluationStarted) {
            timer = setTimeout(() => {
                startNextTest();
            }, randomNumberBetween(1, 3) * 1000);
        }
        return () => clearTimeout(timer);
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

    const startEvaluation = () => {
        startNextTest()
    };

    const resetEvaluation = () => {
        initializeDots();
        setActiveDotId(-1);
        setEvaluatedEye(null);
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
            startEvaluation: startEvaluation,
            resetEvaluation: resetEvaluation,
            recordResponse,
            evaluationStarted: evaluationStarted,
            evaluationFinished: evaluationFinished,
            evaluatedEye: evaluatedEye,
            setEvaluatedEye: setEvaluatedEye,
            testActive: testActive,
            progress: dots.filter(dot => dot.testPassed !== null).length / totalDots
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

const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}