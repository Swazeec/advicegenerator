import { useState, useEffect } from "react"

import Card from "./UI/Card"
import largeSeparator from '../assets/pattern-divider-desktop.svg'
import mediumSeparator from '../assets/pattern-divider-mobile.svg'
import dice from '../assets/icon-dice.svg'


const Advice = () => {

    const [advice, setAdvice] = useState()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const url = 'https://api.adviceslip.com/advice'
    let randomId = '/'+Math.floor(Math.random()*223)

    const fetchAdvice = async (id='')=>{
        const response = await fetch(url+id)
        if(!response.ok){
            setError(true)
        }
        const advice = await response.json()
        setAdvice({id:advice.slip.id, advice: advice.slip.advice})
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchAdvice()
    },[]) 

    const clickHandler = () => {
        fetchAdvice(randomId)
    }

    if(error){
        return <Card>Something went wrong</Card>
    }

    if(isLoading){
        return <Card>Loading...</Card>
    }


    return (
        <>
            <Card>
                <div>
                    <h2>Advice #{advice.id}</h2>
                    <p className="quote">"{advice.advice}"</p>
                    <img className="medium" src={mediumSeparator} alt='separator'/>
                    <img className="large" src={largeSeparator} alt='separator'/>
                </div>
            </Card>
            <button onClick={clickHandler}><img src={dice} alt='dice'/></button>
        </>
    )
}

export default Advice