/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import { Typography } from 'antd';
import GridLayout from '../grid/GridLayout';
import { useTestContext } from './TestContext';
import { Instructions } from '../Instructions';

const { Title } = Typography;

const TestPage: React.FC = () => {
    const containerStyle = css`
        height: 100%;
        display: flex;
        flex-direction: column;
    `

    const { startTest, recordResponse, activeDot } = useTestContext()
    const [testLoaded, setTestLoaded] = useState(false)

    const handleResponse = (response: boolean) => {
        if (activeDot) {
            recordResponse(activeDot.opacity, response)
        }
    }



    return (
        <div css={containerStyle}>
            <Title>Visual Fields Test</Title>

            {!testLoaded && <Instructions 
                onInstructionComplete={() => setTestLoaded(true)}
            />}

            {testLoaded && <div css={css`flex: 1;`}>
                <GridLayout />
            </div>}

        </div>
    );
};

export default TestPage;

