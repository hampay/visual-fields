/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Row, Col } from 'antd';
import { GridItem } from './GridItem';

const GridLayout: React.FC = () => {
    const rows = 9;
    const cols = 11;

    return (
        <div css={gridContainerStyle}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <Row key={rowIndex} css={rowStyle}>
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Col key={colIndex} span={24 / cols} css={colStyle}>
                            <GridItem />
                        </Col>
                    ))}
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
