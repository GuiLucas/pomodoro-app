import { create } from 'zustand'
import type * as Core from '../types'

type PomodoroState = {
    userEmail: Core.Optional<string>
    // todos: Todo[]
}

type PomodoroActions = {
    actions: {
        setUserEmail: (userEmail: string) => void
    }
}

type PomodoroStore = PomodoroState & PomodoroActions

const initialState: PomodoroState = {
    userEmail: undefined
}

const usePomodoroStore = create<PomodoroStore>()((set, get) => ({
    ...initialState,
    actions: {
        setUserEmail:
            (userEmail) => set({ userEmail }),
    }
}))

export const useUserEmail = () => usePomodoroStore((state) => state.userEmail)

export const usePomodorosActions = () => usePomodoroStore((state) => state.actions)

