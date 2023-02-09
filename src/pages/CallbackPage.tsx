import { 
    Box, 
    Center, 
    Flex 
} from '@mantine/core';
import { 
    PageLayout, 
    WelcomeForm, 
    TodoList 
} from '../components';

export function CallbackPage() {
    return (
        <PageLayout>
            <Box>
                <Center>
                    <Box>
                        <Flex justify='center'>
                            <WelcomeForm />
                        </Flex>
                        <TodoList />
                    </Box>
                </Center>
            </Box>
        </PageLayout>
    )
}
