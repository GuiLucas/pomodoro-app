import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';
import { AppHeader } from './Header';

type PageLayoutProps = {
    children: React.ReactNode
}

export function PageLayout({children}: PageLayoutProps) {
    const theme = useMantineTheme()

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark'
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0]
                }
            }}
            header={<AppHeader/>}
        >
           { children }
        </AppShell>
    )
}
