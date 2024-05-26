/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, ReactNode } from "react"

export const AppContainer:FC<{children: ReactNode}> = ({ children }) => {
    const containerStyle = css`
        height: 100%;
        overflow: hidden;
    `
    return <div css={containerStyle}>{ children }</div>
}