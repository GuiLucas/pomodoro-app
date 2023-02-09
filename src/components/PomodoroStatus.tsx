import { Badge, Box, Flex, Progress } from "@mantine/core";
import { useCompletedPomodoros } from "../store";

type PomodoroStatusProps = {
    taskTimerActive: boolean
    breakTimerActive: boolean
    taskSeconds: number
    breakSeconds: number
}

export function PomodoroStatus(props: PomodoroStatusProps) {
    const {
        taskTimerActive,
        breakTimerActive,
        taskSeconds,
        breakSeconds,
    } = props
    
    const completedPomodoros = useCompletedPomodoros()
    const breakMinutes = Math.floor(breakSeconds/60)
    const taskMinutes = Math.floor(taskSeconds/60)

    return <Box mt='lg' style={{ maxWidth: '800px' }}>
        <Progress
            mt='md'
            color="violet"
            radius="xl"
            size="xl"
            value={25 * completedPomodoros}
        />
        <Flex gap='md' justify='center' align={'center'} mt='md'>
            {/* <p>{minutes</p> */}
            {
                taskTimerActive &&
                <Badge
                    color="violet"
                    variant="filled"
                >
                    Current Task {taskMinutes} minutes
                </Badge>
            }
            {
                breakTimerActive &&
                <Badge
                    color="violet"
                    variant="filled"
                >
                    Break for {breakMinutes} minutes
                </Badge>
            }
            <Badge
                color="teal"
                variant="filled"
            >
                {completedPomodoros} Pomodoros
            </Badge>
        </Flex>
    </Box>
} 