import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePomodorosActions } from "../store";

type FormValues = {
    email: string
}

type WelcomeModalProps = {
    isOpen: boolean
    onClose: () => void
}

export function WelcomeModal(props: WelcomeModalProps) {
    const {
        isOpen,
        onClose
    } = props

    const { setUserEmail } = usePomodorosActions()

    const form = useForm<FormValues>({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    })

    function handleSubmit(values: FormValues) {
        setUserEmail(values.email)
        onClose()
    }

    return <Modal
        opened={isOpen}
        centered
        onClose={onClose}
        title='Welcome to Pomodoro'
        // withCloseButton={false}
    >
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                placeholder="your@email.com"
                label="Your Email"
                style={{borderColor: '#845ef' }}
                {...form.getInputProps('email')}
            />
            <Group position="right" mt="md">
                <Button variant="light" color="violet.5" type="submit">Submit</Button>
            </Group>
        </form>
    </Modal>
}