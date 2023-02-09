import { useState, useEffect } from 'react'
import {
    Box,
    Center,
    Flex,
} from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import {
    PageLayout,
    WelcomeForm,
    TodoList,
    LoaderOverlay,
    PomodoroStatus,
    SettingsModal,
} from '../components'
import { 
    useActiveTodo, 
    useCompletedPomodoros, 
    useSettings, 
    useStoreActions 
} from '../store'
import { useTodos } from '../lib'

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
    const { isLoading, error, data } = useTodos()

    const activeTodo = useActiveTodo()
    const completedPomodoros = useCompletedPomodoros()
    const {
        pomodoro: pomodoroTimer,
        shortBreak,
        longBreak
    } = useSettings()
    const {
        setActiveTodo,
        toggleCompleted,
        resetCompletedPomodoro
    } = useStoreActions()

    const [taskSeconds, setTaskSeconds] = useState(0)
    const [breakSeconds, setBreakSeconds] = useState(shortBreak)
    const taskInterval = useInterval(() => setTaskSeconds((s) => s + 1), 1000)
    const breakInterval = useInterval(() => setBreakSeconds((s) => s - 1), 1000)

    useEffect(
        () => {
            if (taskSeconds === pomodoroTimer) {
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
        setBreakSeconds(completedPomodoros === 3 ? longBreak : shortBreak)
    }

    function handleClickStart(todoId: number) {
        taskInterval.start()
        setActiveTodo(todoId)
    }

    function handleClickStop() {
        taskInterval.stop()
        setTaskSeconds(0)
        setActiveTodo(undefined)
    }

    const taskTimerActive = taskInterval.active
    const breakTimerActive = breakInterval.active

    if (isLoading) {
        return <PageLayout>
            <Box>
                <Center>
                    <Box>
                        <Flex justify='center'>
                            <WelcomeForm />
                        </Flex>
                        <LoaderOverlay isFullScreen={false} />
                    </Box>
                </Center>
            </Box>
        </PageLayout>
    }

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
                        {
                            data?.length
                                ? <PomodoroStatus 
                                    breakSeconds={breakSeconds}
                                    breakTimerActive={breakTimerActive}
                                    taskSeconds={taskSeconds}
                                    taskTimerActive={taskTimerActive}
                                />
                                : null
                        }
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
