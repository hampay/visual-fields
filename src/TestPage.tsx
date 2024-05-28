/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react';
import { Typography } from 'antd';
import GridLayout from './grid/GridLayout';
import { useTestContext } from './TestContext';

const { Title } = Typography;

const TestPage: React.FC = () => {
    const containerStyle = css`
        height: 100%;
        display: flex;
        flex-direction: column;
    `
    const { startTest, recordResponse, activeDot } = useTestContext()
    useEffect(() => {
        startTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleResponse = (response: boolean) => {
        if (activeDot) {
            recordResponse(activeDot.opacity, response)
        }
    }

    
    return (
        <div css={containerStyle}>
            <Title>Visual Fields Test</Title>
            <div><button onClick={() => handleResponse(true)}>Pass √</button> <button onClick={() => handleResponse(false)}>fail x</button></div>
            <div css={css`flex: 1;`}>
                <GridLayout />
            </div>
            {/* Add controls for starting/stopping the test */}
        </div>
    );
};

export default TestPage;