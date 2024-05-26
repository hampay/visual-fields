/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Typography } from 'antd';
import GridLayout from './grid/GridLayout';

const { Title } = Typography;

const TestPage: React.FC = () => {
    const containerStyle = css`
        height: 100%;
        display: flex;
        flex-direction: column;
    `
    return (
        <div css={containerStyle}>
            <Title>Visual Fields Test</Title>
            <div css={css`flex: 1;`}>
                <GridLayout />
            </div>
            {/* Add controls for starting/stopping the test */}
        </div>
    );
};

export default TestPage;
