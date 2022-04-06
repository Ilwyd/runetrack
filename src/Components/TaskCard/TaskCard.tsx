import React from 'react';
import { Check, CircleCheck, Heart } from 'tabler-icons-react';
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    ActionIcon,
    createStyles,
    useMantineTheme,
    Space,
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

    like: {
        color: theme.colors.red[6],
        //fill: theme.colors.red[6]
    },

    check: {
        //fill: theme.colors.green[6],
        color: theme.colors.green[6]
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
    image: string;
    link: string;
    title: string;
    description: string;
    type: string;
    rewards: Reward;
}

export function TaskCard({ image, link, title, description, type, rewards }: TaskCardProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const xpBadges = rewards.xp ? rewards.xp.map((value) => (
        <Badge
        color={'green'}
        key={value}
        >
            {value}
        </Badge>
    )): null;

    const lootBadges = rewards.loot ? rewards.loot.map((value) => (
        <Badge
        color={'yellow'}
        key={value}
        >
            {value}
        </Badge>
    )): null;

    const reputationBadges = rewards.reputation ? rewards.reputation.map((value) => (
        <Badge
        color={'red'}
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
                <ActionIcon variant="default" radius="md" size={36}>
                    <CircleCheck size={18} className={classes.check} />
                </ActionIcon>
                <ActionIcon variant="default" radius="md" size={36}>
                    <Heart size={18} className={classes.like} />
                </ActionIcon>
            </Group>
        </Card>
    );
}