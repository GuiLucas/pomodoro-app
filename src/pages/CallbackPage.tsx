import { Box, Center, Flex } from '@mantine/core';
import { LoaderOverlay, PageLayout, WelcomeForm, TodoList } from '../components';
import {  } from '../components/TodoList';
import {  useTodos } from '../lib';

export function CallbackPage() {

    const { isLoading, error, data } = useTodos(1)

    if(isLoading) return <LoaderOverlay /> 

    if(error) return <p>There was an error with retrieving data: {error?.message}</p>

    return (
        <PageLayout>
            <Box>
                <Center>
                    <Box>
                        <Flex justify='center'>
                            <WelcomeForm />
                        </Flex>
                        <TodoList todos={data} />
                    </Box>
                </Center>
            </Box>
        </PageLayout>
    )
}
