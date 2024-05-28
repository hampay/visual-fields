/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Row, Col } from 'antd';
import { GridItem } from './GridItem';
import { useTestContext } from '../TestContext';
import Dot from './Dot';

const GridLayout: React.FC = () => {
    const { dots, numColumns } = useTestContext();
    const numRows = Math.ceil(dots.length / numColumns);

    return (
        <div css={gridContainerStyle}>
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
