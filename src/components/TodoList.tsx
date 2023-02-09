import { Box, Button, CheckIcon, Divider, Flex, Group, Text } from "@mantine/core"
import { Todo } from "../types"
import { useActiveTodo, useTodosFromStore } from "../store"

type TodoCardProps = {
    todo: Todo
    disableButtons: boolean
    onClickStart: (todoId: number) => void
    onClickStop: (todoId: number) => void
}

function TodoCard(props: TodoCardProps) {
    const {
        todo,
        disableButtons,
        onClickStart,
        onClickStop
    } = props

    const activeTodo = useActiveTodo()
    
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
        <Flex align='baseline' justify='center' >
            <Text mb='sm' fw='bold'>{todo.title}</Text>
            {
                todo.completed &&
                <CheckIcon color='green' style={{ marginLeft: '16px' }} width={12} height={12} />
            }
        </Flex>
        <Text>{todo.body}</Text>
        {
            !todo.completed &&
            <>
                <Divider my="sm" />
                <Group position="right">
                    {
                        activeTodo === todo.id
                            ? <Button
                                color="violet.5"
                                disabled={disableButtons}
                                onClick={() => onClickStop(todo.id)}
                            >
                                Stop
                            </Button>
                            : <Button 
                                color="violet.5"
                                disabled={disableButtons}
                                onClick={() => onClickStart(todo.id)}
                            >
                                Start
                            </Button>
                    }
                </Group>
            </>
        }
    </Box>
}

type TodoListProps = {
    disableButtons: boolean
    onClickStart: (todoId: number) => void
    onClickStop: (todoId: number) => void
}

export function TodoList(props: TodoListProps) {
    const {
        disableButtons,
        onClickStart,
        onClickStop
    } = props

    const data = useTodosFromStore()

    if(!data.length) return null

    return <Box mt='lg' style={{ maxWidth: '800px' }}>
        <Text
            fz='xl'
            fw='700'
            ta='center'
        >
            Todos
        </Text>
        {
            data?.map(
                todo => <TodoCard
                    key={todo.id}
                    todo={todo}
                    disableButtons={disableButtons}
                    onClickStart={onClickStart}
                    onClickStop={onClickStop}
                />
            )
        }
    </Box>
}