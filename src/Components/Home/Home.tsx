import { useState } from "react";
import CardArea from "../CardArea/CardArea";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const tabs = ["Dailies", "Weeklies", "Monthlies", "Favourites"]

function Home()  {
    const [activeTab, setActiveTab] = useState("Dailies")
    
    const tabChange = (active: number, tabKey: string) => {
        setActiveTab(tabKey);
    }

    return(
        <>
            <Header tabs={tabs} tabChange={tabChange}/>
            <CardArea activeTab={activeTab} />
            <Footer />
        </>
    )
}

export default Home;