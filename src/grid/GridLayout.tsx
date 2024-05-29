/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Row, Col, Progress } from 'antd';
import { GridItem } from './GridItem';
import { useTestContext } from '../test/TestContext';
import Dot from './Dot';

const GridLayout: React.FC = () => {
    const { dots, numColumns, progress } = useTestContext();
    const numRows = Math.ceil(dots.length / numColumns);

    const progressStyle = css`
        position: absolute;
        bottom: 5px;
        left: 5px;
    `

    return (
        <div css={gridContainerStyle}>
            <Progress size={30} type="circle" css={progressStyle} percent={progress * 100} />
            {Array.from({ length: numRows }).map((_, rowIndex) => (
                <Row key={rowIndex} css={rowStyle}>
                    {Array.from({ length: numColumns }).map((_, colIndex) => {
                        const dotIndex = rowIndex * numColumns + colIndex;
                        const dot = dots[dotIndex];
                        const isHalfway = dotIndex === Math.floor(dots.length / 2);
                        return (
                            <Col key={colIndex} span={24 / numColumns} css={colStyle}>
                                {dot && <GridItem showCrosshair={isHalfway}>
                                    <Dot dot={dot} />
                                </GridItem>} {/* Pass the dot as props to GridItem */}
                            </Col>
                        );
                    })}
                </Row>
            ))}
        </div>
    );
};

const gridContainerStyle = css`
    width: 100%;
    height: 100%; /* Make sure it takes up full viewport height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative
`;

const rowStyle = css`
    width: 100%;
    flex-grow: 1; /* Make rows stretch to fill vertical space */
`;

const colStyle = css`
    height: 100%;
    flex-grow: 1; /* Make columns stretch to fill horizontal space */
`;

export default GridLayout;
