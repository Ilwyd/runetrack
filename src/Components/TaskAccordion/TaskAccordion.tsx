import { Accordion, ActionIcon, Button, createStyles, Group, Text } from "@mantine/core";
import { useState } from "react";
import { CircleCheck, Heart } from "tabler-icons-react";

interface Reward {
    xp?: Array<string>;
    loot?: Array<string>;
    reputation?: Array<string>;
}

interface TaskAccordionProps {
    label: string;
    image: string;
    link: string;
    description: string;
    rewards: Reward;
}

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    },

    section: {
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    unfavourited: {
        color: theme.colors.red[6],
    },

    favourited: {
        color: theme.colors.red[6],
        fill: theme.colors.red[6]
    },

    uncompleted: {
        color: theme.colors.green[6]
    },

    completed: {
        fill: theme.colors.green[6],
        color: theme.colors.dark[7]
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.sm,
        fontWeight: 700,
    },

    badgeLabel: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700
    }
}));

export function TaskAccordion({ label, image, link, description, rewards }: TaskAccordionProps) {
    const {classes} = useStyles();
    const [completed, setCompleted] = useState(Boolean);
    const [favourited, setFavourited] = useState(Boolean);

    return (
        <>
        <Text size="sm" mt="xs">{description}</Text>
        <Group mt="xs">
                <Button onClick={() => {window.open(link, "_blank")}} radius="md" style={{ flex: 1 }}>
                    Runescape Wiki
                </Button>
                <ActionIcon onClick={clickComplete} variant="default" radius="md" size={36}>
                    <CircleCheck size={18} className={completed ? classes.completed : classes.uncompleted} />
                </ActionIcon>
                <ActionIcon onClick={clickFavourite} variant="default" radius="md" size={36}>
                    <Heart size={18} className={favourited ? classes.favourited : classes.unfavourited} />
                </ActionIcon>
            </Group>
        </>
    )

    function clickFavourite() {
        const json = localStorage.getItem(label)
        if (json === null) return

        const taskData = JSON.parse(json)
        const newFavourite = taskData.favourited ? false : true
        const newData = JSON.stringify({
            favourited: newFavourite,
            completed: taskData.completed
        })

        setFavourited(newFavourite)
        localStorage.setItem(label, newData)
    }

    //On clicking the complete button on a card, update the data in localStorage
    function clickComplete() {
        const json = localStorage.getItem(label)
        if (json === null) return

        const taskData = JSON.parse(json)
        const newCompleted = taskData.completed ? false : true
        const newDate = taskData.completed ? null : new Date().toUTCString()
        const newData = JSON.stringify({
            favourited: taskData.favourited,
            completed: newCompleted,
            completedDay: newDate
        })

        setCompleted(newCompleted)
        localStorage.setItem(label, newData)
	}
}

