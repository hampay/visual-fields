/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import React from 'react';
import { DotRecord, useTestContext } from '../test/TestContext';

interface DotProps {
    dot: DotRecord;
}

const Dot: React.FC<DotProps> = ({ dot }) => {
    const { activeDotId, evaluationFinished, testActive } = useTestContext();
    const opacity = (evaluationFinished || (dot.id === activeDotId && testActive)) ? dot.opacity : 0;
    const dotStyle = getDotStyle(opacity)
    const flashing = keyframes`
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    `;
    const wrapperStyle = css`
        animation: ${flashing} .3s infinite;
    `
    return <div css={wrapperStyle}>
        <div css={dotStyle} />
    </div>
};

function getDotStyle(opacity: number) {
    return css`
        width: 8px;
        height: 8px;
        background-color: #00ff00;
        border-radius: 50%;
        opacity: ${opacity};
    `;
}

export default Dot;
