/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, ReactNode } from "react"
type GridItemProps = {
    children: ReactNode
}
export const GridItem: FC<GridItemProps> = ({ children }) => {
    const containerStyle = css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    return <div css={containerStyle}>
        { children }
    </div>
}