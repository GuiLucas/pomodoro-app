import { Todo } from "../types"

export function toggleCompleted(list: Todo[], todoId: number): Todo[] {
    return list.map(
        (todo) => {
            if(todo.id === todoId) {
                return {
                    ...todo, 
                    completed: true
                }
            } else return todo
        }
    )
}