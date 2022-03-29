import { Container } from "@mantine/core";
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
                {data[activeTab].map((task) => {
                    return <TaskCard image={task.image} description={task.description} title={task.name} type="Daily" />
                })}
            </Container>
        )
    }
}

export default CardArea;