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
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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
        fill: theme.colors.red[6]
    },

    check: {
        fill: theme.colors.green[6],
        color: theme.colors.gray[9]
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    }
}));

interface TaskCardProps {
    image: string;
    title: string;
    description: string;
    type: string;
    badges?: {
        emoji: string;
        label: string;
    }[];
}

export function TaskCard({ image, title, description, type, badges }: TaskCardProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const features = badges ? badges.map((badge) => (
        <Badge
            color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
            key={badge.label}
            leftSection={badge.emoji}
        >
            {badge.label}
        </Badge>
    )) : null;

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={image} alt={title} height={180} />
            </Card.Section>

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
                <Group spacing={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}>
                    Show details
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