import { FC, useState } from "react"
import { eyeOptions, useTestContext } from "./test/TestContext"
import { Duration } from "luxon"
import Paragraph from "antd/es/typography/Paragraph"
import SpaceBarListener from "./SpaceBarListener"
import Card from "antd/es/card/Card"
import Link from "antd/es/typography/Link"
import { Radio } from "antd"
type InstructionsProps = {
    onInstructionComplete: () => void
}
export const Instructions: FC<InstructionsProps> = ({
    onInstructionComplete
}) => {
    const [currentInstruction, setCurrentInstruction] = useState(0)

    const nextInstruction = () => {
        if (currentInstruction === instructions.length - 1) {
            onInstructionComplete()
        } else {
            setCurrentInstruction(currentInstruction + 1)
        }
    }

    const instructions = useGetStartingInstructions(nextInstruction)

    return <>
        { instructions[currentInstruction] }
        <SpaceBarListener 
            onResponse={nextInstruction}
        />
    </>
}

const useGetStartingInstructions = (onClick: () => void) => {
    const { totalDots, testTime } = useTestContext()
    const minutes = roundedMinutesFromSeconds(totalDots * (testTime + 1))

    const { setTestingEye, testingEye } = useTestContext()

    return [
        <Card
            actions={[<Link onClick={onClick}>Continue</Link>]}
            title="About this test"
        >
            <Paragraph>This test will help you check your visual fields.</Paragraph>
            <Paragraph>The test is made up of a grid of dots that you will be shown one by one.</Paragraph>
        </Card>,
        <Card
            actions={[<Link onClick={onClick}>Continue</Link>]}
            title="Settings"
        >
            <Paragraph>Choose whether you will be testing one eye or both:</Paragraph>
            <Paragraph>
                <Radio.Group options={[...eyeOptions]} onChange={(e) => setTestingEye(e.target.value)} value={testingEye} optionType="button" />
            </Paragraph>
        </Card>,
        <Card
            actions={[<Link onClick={onClick}>Continue</Link>]}
            title="Instructions"
        >
            <Paragraph>Always look at the cross in the center of the grid. When you see a dot somewhere on the screen press the spacebar.</Paragraph>
            <Paragraph>The dots will be shown at different opacities and the time between each dot will vary.</Paragraph>
        </Card>,
        <Card
            title="Start the test"
        >
            <Paragraph>
                The test will take rougly {minutes} minutes.
            </Paragraph>
            <Paragraph>Press the spacebar to start the test.</Paragraph>
        </Card>
    ]
}

const roundedMinutesFromSeconds = (seconds: number) => {
    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000;

    // Create a Duration object from milliseconds
    const duration = Duration.fromMillis(milliseconds);

    // Convert the duration to minutes and round it
    const minutes = duration.as('minutes');

    // Return the rounded minutes
    return Math.round(minutes);
};