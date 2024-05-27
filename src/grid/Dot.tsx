/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { DotRecord } from '../TestContext';

interface DotProps {
  dot: DotRecord;
}

const Dot: React.FC<DotProps> = ({ dot }) => {
  return <div css={dotStyle(dot.opacity)} />;
};

const dotStyle = (opacity: number) => css`
  width: 16px;
  height: 16px;
  background-color: #00ff00;
  border-radius: 50%;
  opacity: ${opacity};
`;

export default Dot;
