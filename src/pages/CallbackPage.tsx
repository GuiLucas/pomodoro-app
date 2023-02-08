import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from '../components';

export function CallbackPage() {
    const { isAuthenticated } = useAuth0()

    if (!isAuthenticated) return null

    return (
        <PageLayout>
            <h1>Hello App!</h1>
        </PageLayout>
    )
}
