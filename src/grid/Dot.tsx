/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { DotRecord, useTestContext } from '../test/TestContext';

interface DotProps {
    dot: DotRecord;
}

const Dot: React.FC<DotProps> = ({ dot }) => {
    const { activeDotId, evaluationFinished, testActive } = useTestContext();
    const opacity = (evaluationFinished || (dot.id === activeDotId && testActive)) ? dot.opacity : 0;
    const dotStyle = getDotStyle(opacity)
    return <div css={dotStyle} />;
};

function getDotStyle(opacity: number) {
    return css`
        width: 16px;
        height: 16px;
        background-color: #00ff00;
        border-radius: 50%;
        opacity: ${opacity};
    `;
}

export default Dot;
