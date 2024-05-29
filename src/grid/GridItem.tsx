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
        position: relative;
    `

    const crosshairsStyle = css`
        display: inline-block;
        position: relative;
        padding: 30px;
    `

    const crosshairLinesStyle = showCrosshair && css`
        &::before, &::after {
            content: '';
            position: absolute;
            background-color: #aaa;
        }
        &::before {
            width: 1px;
            height: 100%;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        &::after {
            width: 100%;
            height: 1px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    `

    return (
        <div css={containerStyle}>
            <div css={[crosshairsStyle, crosshairLinesStyle]}>
                {children}
            </div>
        </div>
    )
}
