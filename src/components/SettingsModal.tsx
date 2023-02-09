import { Button, Group, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { useSettings, useStoreActions } from "../store"

const changeSettingsNotification = {
    title: 'Settings saved!',
    message: 'Timer value changed.',
    color: 'teal',
}

// Convert from seconds to minutes to display 
// Convert from minutes to seconds to state

type FormValues = {
    pomodoro: number,
    shortBreak: number,
    longBreak: number
}


export function SettingsModal() {
    const {
        pomodoro,
        shortBreak,
        longBreak
    } = useSettings()
    const [opened, setOpened] = useState(false)

    const { changeSettings } = useStoreActions()

    const form = useForm<FormValues>({
        initialValues: {
            pomodoro: pomodoro / 60,
            shortBreak: shortBreak / 60,
            longBreak: longBreak / 60
        }
    })

    function handleSubmit(values: FormValues) {
        changeSettings({
            pomodoro: values.pomodoro * 60,
            shortBreak: values.shortBreak * 60,
            longBreak: values.longBreak * 60,
        })
        showNotification(changeSettingsNotification)
        setOpened(false)
    }

    return <>
        <Modal
            opened={opened}
            centered
            onClose={() => setOpened(false)}
            title="Change time (minutes)"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    placeholder="Enter a time"
                    label="Pomodoro"
                    {...form.getInputProps('pomodoro')}
                />
                <TextInput
                    placeholder="Enter a time"
                    label="Short Break"
                    {...form.getInputProps('shortBreak')}
                />
                <TextInput
                    placeholder="Enter a time"
                    label="Long Break"
                    {...form.getInputProps('longBreak')}
                />
                <Group position="right" mt="md">
                    <Button
                        variant="light" 
                        color="violet" 
                        type="submit"
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Modal>

        <Group position="center">
         <Button
                 variant="light" 
                 color="violet" 
                onClick={() => setOpened(true)}
            >
                Settings
            </Button>
        </Group>
    </>
}