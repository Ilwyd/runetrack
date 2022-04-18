import { Container, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { Tabs } from "../../Constants/Tabs";
import { data } from "../../tasks";
import { TaskCard } from "../TaskCard/TaskCard";

interface CardAreaProps {
    activeTab: Tabs;
}

function CardArea({ activeTab }: CardAreaProps) {
    const [search, setSearch] = useState('')

    if (activeTab == Tabs.FAVORITES) {
        return (
            <></>
        )
    }
    else {
        return (
            <Container>
                <TextInput value={search} onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search for a task"
                    radius="md"
                />
                <br/>
                <SimpleGrid cols={3}>
                    {data[activeTab].map((task) => {
                        if(search === '' || task.name.toLowerCase().includes(search.toLowerCase()))
                            return <TaskCard label={task.label} link={task.link} image={task.image} description={task.description} title={task.name} type="Daily" rewards={task.rewards} />
                    })}
                </SimpleGrid>
            </Container>
        )
    }
}

export default CardArea;