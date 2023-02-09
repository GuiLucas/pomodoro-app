import { Center, Loader } from "@mantine/core";
import type * as Core from '../types'

type LoaderOverlayProps = {
    isFullScreen?: Core.Optional<boolean>
}

export function LoaderOverlay(props: LoaderOverlayProps) {
    const { isFullScreen = true } = props
    return <Center
        style={
            isFullScreen
                ? { width: '100vw', height: '100vh' }
                : { marginTop: '16px' }}
    >
        <Loader color="gray" size='xl' />
    </Center>
}