/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from "react"
import GridLayout from './grid/GridLayout'

export const VisualFields:FC = () => {
    const containerStyle = css`
        height: 100%;
        overflow: hidden;
    `
    return <div css={containerStyle}>
        <GridLayout />
    </div>
}