import { Accordion, ActionIcon, Button, createStyles, Group, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { CircleCheck, Heart } from "tabler-icons-react";

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
    type: string;
    rewards: Reward;
}

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

    unfavourited: {
        color: theme.colors.red[6],
    },

    favourited: {
        color: theme.colors.red[6],
        fill: theme.colors.red[6]
    },

    uncompleted: {
        color: theme.colors.green[6]
    },

    completed: {
        fill: theme.colors.green[6],
        color: theme.colors.dark[7]
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
    },
    
    wiki: {
        maxWidth: '25%'
    }
}));

export function TaskAccordion({ label, image, link, description, type, rewards }: TaskAccordionProps) {
    const {classes} = useStyles();
    const [completed, setCompleted] = useState(Boolean);
    const [favourited, setFavourited] = useState(Boolean);
    const [counter, setCounter] = useState(0);
    const counterRef = useRef(0);

    //On first load check the fave / complete state from local storage
    useEffect(() => {
        const json = localStorage.getItem(label);
        if(json === null) {
            const newData = JSON.stringify({
                favourited: false,
                completed: false,
                completedDay: null
            })

            localStorage.setItem(label, newData)
            setCompleted(false)
            setFavourited(false)
            return
        }

        const taskData = JSON.parse(json)
        setCompleted(taskData.completed)
        setFavourited(taskData.favourited)


    }, [label])

    //Check to see if the completetion status of the task card should be changed every second
    //TODO: Currently only implemented for daily tasks and needs some cleanup
    useEffect(() => {
        counterRef.current += 1
        const timer = setTimeout(() => setCounter(counter + 1), 1000)
        
        //Get the task data from localStorage
        const json = localStorage.getItem(label)
        if(json === null)
            return () => clearTimeout(timer)

        const taskData = JSON.parse(json)

        //Prepare current and task completion dates for comparison
        const currDate = new Date()
        const taskDate = new Date(taskData.completedDay)

        if(type === 'daily')
    		resetDaily(currDate, taskDate, taskData);
        //TODO:Implement the below functions
        else if(type === 'weekly')
		    resetWeekly()
        else if(type === 'monthly')
		    resetMonthly()
        else
    		resetOther()

        return () => clearTimeout(timer)

    }, [counter, label])

    return (
        <>
            <Text size="sm" mt="xs">{description}</Text>
            <Group mt="xs" position='apart'>
                <Button 
                    onClick={() => {window.open(link, "_blank")}} 
                    radius="md" 
                    style={{ flex: 1 }}
                    className={classes.wiki}
                >
                    Runescape Wiki
                </Button>
                <Group>
                    <ActionIcon onClick={clickComplete} variant="default" radius="md" size={36}>
                        <CircleCheck size={18} className={completed ? classes.completed : classes.uncompleted} />
                    </ActionIcon>
                    <ActionIcon onClick={clickFavourite} variant="default" radius="md" size={36}>
                        <Heart size={18} className={favourited ? classes.favourited : classes.unfavourited} />
                    </ActionIcon>
                </Group>
            </Group>
        </>
    )

    function clickFavourite() {
        const json = localStorage.getItem(label)
        if (json === null) return

        const taskData = JSON.parse(json)
        const newFavourite = taskData.favourited ? false : true
        const newData = JSON.stringify({
            favourited: newFavourite,
            completed: taskData.completed
        })

        setFavourited(newFavourite)
        localStorage.setItem(label, newData)
    }

    //On clicking the complete button on a card, update the data in localStorage
    function clickComplete() {
        const json = localStorage.getItem(label)
        if (json === null) return

        const taskData = JSON.parse(json)
        const newCompleted = taskData.completed ? false : true
        const newDate = taskData.completed ? null : new Date().toUTCString()
        const newData = JSON.stringify({
            favourited: taskData.favourited,
            completed: newCompleted,
            completedDay: newDate
        })

        setCompleted(newCompleted)
        localStorage.setItem(label, newData)
	}

    //Used to reset daily task completion status.
	function resetDaily(currDate: Date, taskDate: Date, taskData: any) {
		//Date parsing changes the date back to local time, so we have to use getUTC methods
        const currDateString = '' + currDate.getUTCDate() + currDate.getUTCMonth() + currDate.getUTCFullYear()
        const taskDateString = '' + taskDate.getUTCDate() + taskDate.getUTCMonth() + taskDate.getUTCFullYear()

        //If the completion UTC date is different from the current, reset the completion status to false, if not already
        if(currDateString !== taskDateString && taskData.completed === true) {
            console.log("Changing " + label + " to incomplete. Dates: \n" + currDateString + "\n" + taskDateString)
            const newCompleted = false
            const newDate = null
            const newData = JSON.stringify({
                favourited: taskData.favourited,
                completed: newCompleted,
                completedDay: newDate
            })

            setCompleted(newCompleted)
            localStorage.setItem(label, newData)
        }
	}

	function resetWeekly() {}
	function resetMonthly() {}
	function resetOther() {}

	function getWeek(date: Date) {
		//https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
	}
}

