import { Box, Button, Center, Text } from "@mantine/core";
import { PageLayout } from "../components";
import { useNavigate } from "react-router-dom";

export function LogoutPage() {
    const navigate = useNavigate()

    return (
        <PageLayout>
            <Center style={{ width: '100%', height: '100%' }}>
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