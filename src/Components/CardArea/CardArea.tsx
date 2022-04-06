import { Container, SimpleGrid } from "@mantine/core";
import { Tabs } from "../../Constants/Tabs";
import { data } from "../../tasks";
import { TaskCard } from "../TaskCard/TaskCard";

interface CardAreaProps {
    activeTab: Tabs;
}

function CardArea({ activeTab }: CardAreaProps) {
    if (activeTab == Tabs.FAVORITES) {
        return (
            <></>
        )
    }
    else {
        return (
            <Container>
                <SimpleGrid cols={3}>
                    {data[activeTab].map((task) => {
                        return <TaskCard link={task.link} image={task.image} description={task.description} title={task.name} type="Daily" />
                    })}
                </SimpleGrid>
            </Container>
        )
    }
}

export default CardArea;