/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import { Typography } from 'antd';
import { Instructions } from '../Instructions';
import { Test } from './Test';

const { Title } = Typography;

const TestPage: React.FC = () => {
    const containerStyle = css`
        height: 100%;
        display: flex;
        flex-direction: column;
    `

    const [testLoaded, setTestLoaded] = useState(false)

    return (
        <div css={containerStyle}>
            <Title>Visual Fields Test</Title>

            {!testLoaded && <Instructions 
                onInstructionComplete={() => setTestLoaded(true)}
            />}

            {testLoaded && <div css={css`flex: 1;`}>
                <Test />
            </div>}

        </div>
    );
};

export default TestPage;

