import { useEffect, useRef, useState } from 'react';
import { CircleCheck, Heart } from 'tabler-icons-react';
import {
    Card,
    Text,
    Group,
    Badge,
    Button,
    ActionIcon,
    createStyles
} from '@mantine/core';

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

interface Reward {
    xp?: Array<string>;
    loot?: Array<string>;
    reputation?: Array<string>;
}

interface TaskCardProps {
    label: string;
    image: string;
    link: string;
    title: string;
    description: string;
    type: string;
    rewards: Reward;
}

export function TaskCard({ label, image, link, title, description, type, rewards }: TaskCardProps) {
    const { classes } = useStyles();
    const XP_REWARD_COLOR = 'green'
    const LOOT_REWARD_COLOR = 'yellow'
    const REPUTATION_REWARD_COLOR = 'red'
    const [completed, setCompleted] = useState(Boolean);
    const [favourited, setFavourited] = useState(Boolean);
    const [counter, setCounter] = useState(0);
    const counterRef = useRef(0);

    useEffect(() => {
        const json = localStorage.getItem(label);
        if(json === null) {
            const newData = JSON.stringify({
                favourited: false,
                completed: false,
                completedDay: null
            })

            localStorage.setItem(label, newData)
            setCompleted(false)
            setFavourited(false)
            return
        }

        const taskData = JSON.parse(json)
        setCompleted(taskData.completed)
        setFavourited(taskData.favourited)


    }, [label])

    //Check to see if the completetion status of the task card should be changed every second
    //TODO: Currently only implemented for daily tasks and needs some cleanup
    useEffect(() => {
        counterRef.current += 1
        const timer = setTimeout(() => setCounter(counter + 1), 1000)
        
        //Get the task data from localStorage
        const json = localStorage.getItem(label)
        if(json === null)
            return () => clearTimeout(timer)

        const taskData = JSON.parse(json)

        //Prepare current and task completion dates for comparison
        const currDate = new Date()
        const taskDate = new Date(taskData.completedDay)

        //Date parsing changes the date back to local time, so we have to use getUTC methods
        const currDateString = '' + currDate.getUTCDate() + currDate.getUTCMonth() + currDate.getUTCFullYear()
        const taskDateString = '' + taskDate.getUTCDate() + taskDate.getUTCMonth() + taskDate.getUTCFullYear()

        //If the completion UTC date is different from the current, reset the completion status to false, if not already
        if(currDateString !== taskDateString && taskData.completed === true) {
            console.log("Changing " + label + " to incomplete. Dates: \n" + currDateString + "\n" + taskDateString)
            const newCompleted = false
            const newDate = null
            const newData = JSON.stringify({
                favourited: taskData.favourited,
                completed: newCompleted,
                completedDay: newDate
            })

            setCompleted(newCompleted)
            localStorage.setItem(label, newData)
        }

        return () => clearTimeout(timer)

    }, [counter, label])

    //Below we build the badges for each type of reward based on what's in the task file
    const xpBadges = rewards.xp ? rewards.xp.map((value) => (
        <Badge
        color={XP_REWARD_COLOR}
        key={value}
        >
            {value}
        </Badge>
    )): null;

    const lootBadges = rewards.loot ? rewards.loot.map((value) => (
        <Badge
        color={LOOT_REWARD_COLOR}
        key={value}
        >
            {value}
        </Badge>
    )): null;

    const reputationBadges = rewards.reputation ? rewards.reputation.map((value) => (
        <Badge
        color={REPUTATION_REWARD_COLOR}
        key={value}
        >
            {value}
        </Badge>
    )): null;

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            {/*
            <Card.Section>
                <Image src={image} alt={title} height={180} />
            </Card.Section>
            */}

            <Card.Section className={classes.section} mt="md">
                <Group position="apart">
                    <Text size="lg" weight={500}>
                        {title}
                    </Text>
                    <Badge size="sm">{type}</Badge>
                </Group>
                <Text size="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                    Available rewards
                </Text>
                
                {xpBadges ? 
                    <Group>
                        <Text className={classes.badgeLabel} color="dimmed">
                            Experience
                        </Text>
                    </Group> : null 
                }
                <Group spacing={7} mt={5}>
                    {xpBadges}
                </Group>

                {lootBadges ? 
                    <Group>
                        <Text className={classes.badgeLabel} color="dimmed">
                            Loot
                        </Text>
                    </Group> : null 
                }
                <Group spacing={7} mt={5}>
                    {lootBadges}
                </Group>

                {reputationBadges ? 
                    <Group>
                        <Text className={classes.badgeLabel} color="dimmed">
                            Reputation
                        </Text>
                    </Group> : null 
                }
                <Group spacing={7} mt={5}>
                    {reputationBadges}
                </Group>
            </Card.Section>

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
        </Card>
    );

    //On clicking the favourite button on a card, update the data in localStorage
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