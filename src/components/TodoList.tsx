import { Box, Text } from "@mantine/core"
import { Todo } from "../types"
import { useTodos } from "../lib"
import { LoaderOverlay } from "./LoaderOverlay"

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
        <Text mb='sm' fw='bold' ta='center'>{todo.title}</Text>
        <Text>{todo.body}</Text>
    </Box>
}

export function TodoList() {
    const { isLoading, error, data } = useTodos()

    if(isLoading) 
        return <LoaderOverlay isFullScreen={false}/> 

    if((error instanceof Error)) 
        return <p>There was an error with retrieving data: {error?.message}</p>
    
    return <Box mt='lg' style={{maxWidth: '800px'}}>
        <Text 
            fz='xl' 
            fw='700' 
            ta='center'
        >
            Todos
        </Text>
        {
            data?.map(
                todo => <TodoCard key={todo.id} todo={todo} />
            )
        }
    </Box>
}