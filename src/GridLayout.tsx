/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Row, Col } from 'antd';

const GridLayout: React.FC = () => {
  const rows = 7;
  const cols = 9;

  return (
    <div css={gridContainerStyle}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Row key={rowIndex} css={rowStyle}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Col key={colIndex} span={24 / cols} css={colStyle}>
              <div css={gridItemStyle}></div>
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

const gridItemStyle = css`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
`;

export default GridLayout;
