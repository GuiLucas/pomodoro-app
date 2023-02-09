import type * as Core from '.'

export type Todo = {
    userId: number
    id: number
    title: string
    body: string
} & {
    completed?: Core.Optional<boolean>
}