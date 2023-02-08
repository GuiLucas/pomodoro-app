import { Box, Text } from "@mantine/core"
import { Todo } from "../types"

type TodoCardProps = {
    todo: Todo
}

function TodoCard(props: TodoCardProps) {
    const { todo } = props
    return <Box
        p='md'
        m='md'
        sx={
            (theme) => ({
                border: `1px solid ${theme.colors.violet[9]}`,
                borderRadius: '4px'
            })
        }
    >
        <Text mb='sm' fw='bold'>{todo.title}</Text>
        <Text>{todo.body}</Text>
    </Box>
}

type TodoListProps = {
    todos: Todo[]
}
export function TodoList(props: TodoListProps) {
    const { todos } = props
    
    return <Box mt='lg' style={{maxWidth: '800px'}}>
        <Text 
            fz='xl' 
            fw='700' 
            ta='center'
        >
            Todos
        </Text>
        {
            todos.map(
                todo => <TodoCard key={todo.id} todo={todo} />
            )
        }
    </Box>
}