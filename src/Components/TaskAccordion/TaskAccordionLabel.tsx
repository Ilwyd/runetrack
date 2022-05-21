import { Badge, Group, Text } from "@mantine/core";

interface TaskAccordionLabelProps {
    title: string;
    type: string;
}

function TaskAccordionLabel({title, type}: TaskAccordionLabelProps) {
    return (
        <Group position="apart">
            <Text size='lg' weight={500}>
                {title}
            </Text>
            <Badge>{type}</Badge>
        </Group>
    )
}

export default TaskAccordionLabel;