import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components';
import { Button, Center } from '@mantine/core';

export function HomePage() {
    const navigate = useNavigate()

    return (
        <PageLayout>
            <Center style={{ width: '100%', height: '100%'}}>
                <Button 
                    color='violet'
                    onClick={() => navigate('/callback')}
                >
                    Enter App
                </Button>
            </Center>
        </PageLayout>
    )
}
