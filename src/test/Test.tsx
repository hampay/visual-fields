/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, useEffect, useRef, useState } from "react"
import GridLayout from "../grid/GridLayout"
import { useTestContext } from "./TestContext"
import SpaceBarListener from "../SpaceBarListener"
import { Button, notification, theme } from 'antd'
const { useToken } = theme

export const Test: FC = () => {

    const { token } = useToken()

    const containerStyle = css`
        display: flex;
        height: 100%;
        background: ${token.colorBgBase};
        justify-content: center;
        align-items: center;
    `

    const { startEvaluation, recordResponse, activeDot, evaluationStarted } = useTestContext()

    const markDotSeen = () => {
        if (activeDot) {
            recordResponse(activeDot.opacity, true)
        }
    }

    // useEffect(() => {
    //     startTest()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const containerRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);


    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === containerRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const makeFullScreen = () => {
        if (containerRef.current) {
            containerRef.current.requestFullscreen().catch(err => {
                notification.error({
                    message: 'Error',
                    description: `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                });
            });
        }
    }

    useEffect(() => {
        makeFullScreen()
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isFullscreen && !evaluationStarted) {
            timer = setTimeout(() => {
                startEvaluation()
            }, 2000)
        }
        return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFullscreen, evaluationStarted])


    return <div css={containerStyle} ref={containerRef}>
        
        {isFullscreen ?  <GridLayout /> : <Button onClick={makeFullScreen}>Enable full screen to continue</Button> }
        
        <SpaceBarListener
            onResponse={markDotSeen}
        />
    </div>
}