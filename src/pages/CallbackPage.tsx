import { useState, useEffect } from 'react'
import {
    Badge,
    Box,
    Center,
    Flex,
    Progress,
} from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import {
    PageLayout,
    WelcomeForm,
    TodoList,
    LoaderOverlay,
} from '../components'
import { useActiveTodo, useCompletedPomodoros, useStoreActions } from '../store'
import { useTodos } from '../lib'

// const SHORT_BREAK_TIME = 5 * 60
// const LONG_BREAK_TIME = 20 * 60
// const POMODORO_TIME = 25 * 60
const SHORT_BREAK_TIME = 1
const LONG_BREAK_TIME = 20
const POMODORO_TIME = 2

const shortBreakNotification = {
    title: 'Congrats!',
    message: 'You completed a Pomodoro. Take a short break.',
    color: 'violet'
}

const longBreakNotification = {
    title: 'Congrats!',
    message: 'You completed 4 Pomodoros. Take a long break.',
    color: 'teal',
    autoClose: 10000
}
export function CallbackPage() {
    const { isLoading, error } = useTodos()

    const activeTodo = useActiveTodo()
    const completedPomodoros = useCompletedPomodoros()
    const {
        setActiveTodo,
        toggleCompleted,
        resetCompletedPomodoro
    } = useStoreActions()

    const [taskSeconds, setTaskSeconds] = useState(0)
    const [breakSeconds, setBreakSeconds] = useState(SHORT_BREAK_TIME)
    const taskInterval = useInterval(() => setTaskSeconds((s) => s + 1), 1000)
    const breakInterval = useInterval(() => setBreakSeconds((s) => s - 1), 1000)

    useEffect(
        () => {
            if (taskSeconds === POMODORO_TIME) {
                breakInterval.start()

                taskInterval.stop()
                setTaskSeconds(0)

                if (activeTodo)
                    toggleCompleted(activeTodo)

                setActiveTodo(undefined)

                if (completedPomodoros < 3)
                    showNotification(shortBreakNotification)
            }
        },
        [taskSeconds]
    )

    if (completedPomodoros === 4) {
        showNotification(longBreakNotification)
        resetCompletedPomodoro()
    }

    if (breakSeconds === 0) {
        breakInterval.stop()
        setBreakSeconds(completedPomodoros === 3 ? LONG_BREAK_TIME : SHORT_BREAK_TIME)
    }

    function handleClickStart(todoId: number) {
        if (todoId === activeTodo) {
            taskInterval.toggle()
        } else {
            setTaskSeconds(0)
            taskInterval.start()
            setActiveTodo(todoId)
        }
    }

    function handleClickStop() {
        taskInterval.stop()
        setTaskSeconds(0)
        setActiveTodo(undefined)
    }

    const taskTimerActive = taskInterval.active
    const breakTimerActive = breakInterval.active

    if (isLoading) return <LoaderOverlay />

    if (error instanceof Error)
        return <p>There was an error with retrieving data: {error?.message}</p>

    return (
        <PageLayout>
            <Box>
                <Center>
                    <Box>
                        <Flex justify='center'>
                            <WelcomeForm />
                        </Flex>
                        <Progress
                            mt='md'
                            color="violet"
                            radius="xl"
                            size="xl"
                            value={25 * completedPomodoros}
                        />
                        <Flex gap='md' justify='center' align={'center'} mt='md'>
                            {/* <p>{Math.floor(seconds/60)} minutes</p> */}
                            {
                                taskTimerActive &&
                                <Badge
                                    color="violet"
                                    variant="filled"
                                >
                                    Current Task {taskSeconds} seconds
                                </Badge>
                            }
                            {
                                breakTimerActive &&
                                <Badge
                                    color="violet"
                                    variant="filled"
                                >
                                    Break for {breakSeconds} seconds
                                </Badge>
                            }
                            <Badge
                                color="teal"
                                variant="filled"
                            >
                                {completedPomodoros} Pomodoros
                            </Badge>
                        </Flex>
                        <TodoList
                            disableButtons={breakTimerActive}
                            onClickStart={handleClickStart}
                            onClickStop={handleClickStop}
                        />
                    </Box>
                </Center>
            </Box>
        </PageLayout>
    )
}
