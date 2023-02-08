import { Center, Loader } from "@mantine/core";

export function LoaderOverlay() {
    return <Center style={{ width: '100vw', height: '100vh' }}>
        <Loader color="gray" size='xl' />
    </Center>
}