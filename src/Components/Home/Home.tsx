import { useState } from "react";
import { Tabs } from "../../Constants/Tabs";
import CardArea from "../CardArea/CardArea";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const tabs = Object.values(Tabs);

function Home() {
    const [activeTab, setActiveTab] = useState(Tabs.DAILIES)
    const tabChange = (active: number, tabKey: string) => {
        setActiveTab(tabKey as Tabs);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header tabs={tabs} tabChange={tabChange} />
            <CardArea activeTab={activeTab} />
            <div style={{flex: 1}}></div>
            <Footer />
        </div>
    )
}

export default Home;