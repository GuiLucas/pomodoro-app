import {
    Button,
    Header,
    Text
} from "@mantine/core";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export function AppHeader() {
    const { isAuthenticated } = useAuth0()
    return (
        <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Text c="violet.2" size="lg">
                    Pomodoro
                </Text>
                <div style={{ marginLeft: 'auto' }}>
                    {
                        isAuthenticated
                            ? <LogoutButton />
                            : <LoginButton />
                    }
                </div>
            </div>
        </Header>
    )
}