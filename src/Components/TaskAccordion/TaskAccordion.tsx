interface Reward {
    xp?: Array<string>;
    loot?: Array<string>;
    reputation?: Array<string>;
}

interface TaskAccordionProps {
    label: string;
    image: string;
    link: string;
    title: string;
    description: string;
    type: string;
    rewards: Reward;
}

function TaskAccordion({ label, image, link, title, description, type, rewards }: TaskAccordionProps) {

}

export default TaskAccordion;