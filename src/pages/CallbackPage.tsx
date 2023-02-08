import { useState } from 'react'
import { PageLayout, WelcomeModal } from '../components';
import { useUserEmail } from '../store';

export function CallbackPage() {
    const [isModalOpen, setIsModalOpen] = useState(true)

    const userEmail = useUserEmail()

    return (
        <PageLayout>
            <h1>{userEmail}</h1>
            <WelcomeModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </PageLayout>
    )
}
