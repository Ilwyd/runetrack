import { Container, SimpleGrid, TextInput } from "@mantine/core";
import { useState } from "react";
import { Tabs } from "../../Constants/Tabs";
import { data } from "../../tasks";
import { TaskCard } from "../TaskCard/TaskCard";

interface CardAreaProps {
    activeTab: Tabs;
}

function CardArea({ activeTab }: CardAreaProps) {
    const [search, setSearch] = useState('')

    if (activeTab === Tabs.FAVORITES) {
        return (
            <></>
        )
    }
    else {
        return (
            <Container>
                <TextInput value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())}
                    placeholder="Search for a task"
                    radius="md"
                />
                <br/>
                <SimpleGrid cols={3}>
                    {data[activeTab].map((task) => {
                        if(search === '' || checkSearch(search, task))
                            return <TaskCard label={task.label} link={task.link} image={task.image} description={task.description} title={task.name} type="Daily" rewards={task.rewards} />
                        return null
                    })}
                </SimpleGrid>
            </Container>
        )
    }
}

function checkSearch(searchText: string, taskValues: any) {
    const name = taskValues.name.toLowerCase().includes(searchText)
    const description = taskValues.description.toLowerCase().includes(searchText)
    const loot = taskValues.rewards.loot ? taskValues.rewards.loot.find((element: string) => {
        return element.toLowerCase().includes(searchText)
    }): false

    const reputation = taskValues.rewards.reputation ? taskValues.rewards.reputation.find((element: string) => {
        return element.toLowerCase().includes(searchText)
    }): false

    const experience = taskValues.rewards.xp ? taskValues.rewards.xp.find((element: string) => {
        return element.toLowerCase().includes(searchText)
    }): false
    
    if(name || description || loot || reputation || experience) {
        return true
    }
    return false
}

export default CardArea;