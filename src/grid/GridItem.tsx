/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from "react"
import Dot from './Dot'
type GridItemProps = {
}
export const GridItem: FC<GridItemProps> = () => {
    const containerStyle = css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    return <div css={containerStyle}>
        <Dot opacity={1} />
    </div>
}