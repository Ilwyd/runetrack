import { useState } from "react";

interface CardAreaProps {
    activeTab: string;
}

function CardArea({ activeTab }: CardAreaProps) {
    const [data, setData] = useState({})

    const getCardData = () => {
        fetch('../../tasks.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((myJson) => {
                console.log(myJson)
                setData(myJson)
            })
    }

    return (
        <>
            
        </>
    )
}

export default CardArea;