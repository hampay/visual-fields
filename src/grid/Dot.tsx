/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';

interface DotProps {
  opacity: number;
}

const Dot: React.FC<DotProps> = ({ opacity }) => {
  return <div css={dotStyle(opacity)} />;
};

const dotStyle = (opacity: number) => css`
  width: 20px;
  height: 20px;
  background-color: #33ff00;
  border-radius: 50%;
  opacity: ${opacity};
`;

export default Dot;
