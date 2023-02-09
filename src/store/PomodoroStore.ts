import type * as Core from '../types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toggleCompleted } from '../lib'

type PomodoroState = {
    userEmail: string
    todos: Core.Todo[]
    activeTodo: Core.Optional<number>
    completedPomodoros: number
}

type PomodoroActions = {
    actions: {
        setUserEmail: (userEmail: string) => void
        setTodos: (todos: Core.Todo[]) => void
        setActiveTodo: (todoId: Core.Optional<number>) => void
        toggleCompleted: (todoId: number) => void
        resetCompletedPomodoro: () => void
    }
}

type PomodoroStore = PomodoroState & PomodoroActions

const initialState: PomodoroState = {
    userEmail: '',
    todos: [],
    activeTodo: undefined,
    completedPomodoros: 0
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
                resetCompletedPomodoro: 
                    () => set({ completedPomodoros: 0 }),
            }
        }),
        {
            name: 'pomodoro-user-email',
            partialize: (state) => ({ userEmail: state.userEmail }),
        }
    )
)

export const useUserEmail = () => usePomodoroStore((state) => state.userEmail)
export const useTodosFromStore = () => usePomodoroStore((state) => state.todos)
export const useActiveTodo = () => usePomodoroStore((state) => state.activeTodo)
export const useCompletedPomodoros = () => usePomodoroStore((state) => state.completedPomodoros)
export const useStoreActions = () => usePomodoroStore((state) => state.actions)

