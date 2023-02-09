import type * as Core from '../types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toggleCompleted } from '../lib'

type TimerSettings = {
    pomodoro: number
    shortBreak: number
    longBreak: number
} 
type PomodoroState = {
    userEmail: string
    todos: Core.Todo[]
    activeTodo: Core.Optional<number>
    completedPomodoros: number
    settings: TimerSettings
}

type PomodoroActions = {
    actions: {
        setUserEmail: (userEmail: string) => void
        setTodos: (todos: Core.Todo[]) => void
        setActiveTodo: (todoId: Core.Optional<number>) => void
        toggleCompleted: (todoId: number) => void
        changeSettings: (settings: TimerSettings) => void
        resetCompletedPomodoro: () => void
    }
}

type PomodoroStore = PomodoroState & PomodoroActions

const initialState: PomodoroState = {
    userEmail: '',
    todos: [],
    activeTodo: undefined,
    completedPomodoros: 0,
    settings: {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 20 * 60
    }
}

const usePomodoroStore = create<PomodoroStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            actions: {
                setUserEmail:
                    (userEmail) => set({ userEmail }),
                setTodos: 
                    (todos) => set({ todos }),
                setActiveTodo:
                    (todoId) => set({ activeTodo: todoId}),
                toggleCompleted: 
                    (todoId) => set({ 
                        todos: toggleCompleted(get().todos, todoId),
                        completedPomodoros: get().completedPomodoros + 1
                    }),
                changeSettings:
                    (settings) => set({ settings }),
                resetCompletedPomodoro: 
                    () => set({ completedPomodoros: 0 }),
            }
        }),
        {
            name: 'pomodoro-user-email',
            partialize: (state) => ({ userEmail: state.userEmail, settings: state.settings }),
        }
    )
)

export const useUserEmail = () => usePomodoroStore((state) => state.userEmail)
export const useTodosFromStore = () => usePomodoroStore((state) => state.todos)
export const useActiveTodo = () => usePomodoroStore((state) => state.activeTodo)
export const useCompletedPomodoros = () => usePomodoroStore((state) => state.completedPomodoros)
export const useSettings = () => usePomodoroStore((state) => state.settings)

export const useStoreActions = () => usePomodoroStore((state) => state.actions)

