import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import { data } from "../../tasks";
import { TaskCard } from "../TaskCard/TaskCard";

interface CardAreaProps {
    activeTab: string;
}

function CardArea({ activeTab }: CardAreaProps) {
    return (
        <Container>
            <p>Data {activeTab}</p>
            {data['Dailies'].map((task) => {
                return <TaskCard image={task.image} description={task.description} title={task.name} type="Daily" />
            })}
        </Container>
    )
}

export default CardArea;