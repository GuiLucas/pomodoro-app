import { Box, Button, Center, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePomodorosActions, useUserEmail } from "../store";

type FormValues = {
    email: string
}

export function WelcomeForm() {
    const userEmail = useUserEmail()
    const { setUserEmail } = usePomodorosActions()

    const form = useForm<FormValues>({
        initialValues: {
            email: userEmail ?? '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    })

    function handleSubmit(values: FormValues) {
        setUserEmail(values.email)
    }

    return <Box sx={{ minWidth: '300px' }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                placeholder="your@email.com"
                label="Your Email"
                style={{ borderColor: '#845ef' }}
                {...form.getInputProps('email')}
            />
            <Group position="center" mt="md">
                <Button variant="light" color="violet.5" type="submit">Submit</Button>
            </Group>
        </form>
    </Box>
}