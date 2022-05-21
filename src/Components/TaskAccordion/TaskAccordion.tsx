import { Accordion, Text } from "@mantine/core";

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

export function TaskAccordion({ label, image, link, description, rewards }: TaskAccordionProps) {
    return (
        <Text size="sm" mt="xs">{description}</Text>
    )
}