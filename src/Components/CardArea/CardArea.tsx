import { Accordion, Badge, Container, createStyles, Grid, TextInput } from "@mantine/core";
import { useState } from "react";
import { Tabs } from "../../Constants/Tabs";
import { data } from "../../tasks";
import { TaskAccordion } from "../TaskAccordion/TaskAccordion";
import TaskAccordionLabel from "../TaskAccordion/TaskAccordionLabel";

interface CardAreaProps {
    activeTab: Tabs;
}

const useStyles = createStyles((theme) => ({
    accordionItem: {
        width: '100%'
    }
}))

function CardArea({ activeTab }: CardAreaProps) {
    const [search, setSearch] = useState('')
    const { classes } = useStyles();

    if (activeTab === Tabs.FAVORITES) {
        return (
            <></>
        )
    }
    else {
        return (
            <Container size='md'>
                <TextInput value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())}
                    placeholder="Search for a task"
                    radius="md"
                />
                <br/>
                <Accordion>
                    {data[activeTab].map((task) => {
                        if(search === '' || checkSearch(search, task)) {
                            return (
                                <Accordion.Item
                                    key={task.label} 
                                    className={classes.accordionItem} 
                                    label={
                                        <TaskAccordionLabel 
                                            title={task.name} 
                                            type={activeTab.replace("ies", "y")} />
                                        } 
                                    iconPosition='right'
                                >
                                    <TaskAccordion label={task.label} link={task.link} image={task.image} description={task.description} rewards={task.rewards} />
                                </Accordion.Item>
                            )
                        }
                        return null
                    })}
                </Accordion>
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
