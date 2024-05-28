/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, ReactNode } from "react"
type GridItemProps = {
    children: ReactNode
    showCrosshair?: boolean
}
export const GridItem: FC<GridItemProps> = ({ children, showCrosshair }) => {
    const containerStyle = css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    const crosshairsStyle = css`
        display: inline-block;
        padding: 30px;
        ${showCrosshair && css`
            border: 1px solid #000;
        `}
    `
    return <div css={containerStyle}>
        <div css={crosshairsStyle}>
            { children }
        </div>
    </div>
}