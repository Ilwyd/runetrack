import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const tabs = ["Dailies", "Weeklies", "Monthlies", "Favourites"]

function Home()  {
    return(
        <>
            <Header tabs={tabs} />
            <Footer />
        </>
    )
}

export default Home;