import {
    Avatar,
    Flex,
    Header,
    Text
} from "@mantine/core";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { SettingsModal } from "./SettingsModal";

export function NavBar() {
    const { isAuthenticated, user } = useAuth0()

    return (
        <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Text c="violet.2" size="lg">
                    Pomodoro
                </Text>
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    style={{ marginLeft: 'auto' }}
                >
                    {
                        user
                        ? <Flex
                            gap="md"
                            justify="center"
                            align="center"
                            direction="row"
                        >
                            <Avatar radius="xl" src={user.picture} alt='profile-picture' />
                            <Text>{user.name}</Text>
                        </Flex>
                        : <Avatar radius="xl" color="violet" alt='profile-picture' />
                    }
                    {
                        isAuthenticated && <SettingsModal />
                    }
                    {
                        isAuthenticated
                            ? <LogoutButton />
                            : <LoginButton />
                    }
                </Flex>
            </div>
        </Header>
    )
}