import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react';

// GIFs imports
import G1 from '../assets/feeds_loading_gifs/1.gif';
import G2 from '../assets/feeds_loading_gifs/2.gif';
import G3 from '../assets/feeds_loading_gifs/3.gif';
import G4 from '../assets/feeds_loading_gifs/4.gif';
import G5 from '../assets/feeds_loading_gifs/5.gif';
import G6 from '../assets/feeds_loading_gifs/6.gif';
import G7 from '../assets/feeds_loading_gifs/7.gif';
import G8 from '../assets/feeds_loading_gifs/8.gif';
import G9 from '../assets/feeds_loading_gifs/9.gif';
import G10 from '../assets/feeds_loading_gifs/10.gif';


function FeedLoading() {

    const [fact , setFact] = useState({});

// Defining Facts object
const FactsAndGifs = [
    {
        type: "HUMAN",
        fact: "Energy is the fundamental driving force that powers the entire universe, manifesting in various forms and enabling all physical processes to occur.",
        gif: G1
    },
    {
        type: "CAT",
        fact: `Cats have a specialized collarbone that allows them to gracefully fit through tight spaces and land on their feet, a phenomenon known as the "righting reflex."`,
        gif: G2
    },  
    {
        type: "CAT",
        fact: `Cats have a remarkable ability to purr, not only when they're happy, but also when they are injured or stressed, as purring is believed to have healing properties.`,
        gif: G3
    },
    {   type: "PANDAS",
        fact: `Pandas have a specialized diet consisting almost entirely of bamboo, consuming around 20 to 40 pounds of it daily.`,
        gif: G4
    },
    {
        type: "BEARD",
        fact: `The average man's beard will grow about 5.5 inches per year.`,
        gif: G5
    },
    {
        type: "EMOTION",
        fact: `Anger is a powerful emotion that can lead to increased heart rate and the release of stress hormones in the body.`,
        gif: G6
    },
    {
        type: "DOG",
        fact: `Dogs have an extraordinary sense of smell, with some breeds capable of detecting scents up to 100,000 times better than humans.`,
        gif: G7
    },
    {
        type: "PROGRAMMER",
        fact: `Programmers are skilled professionals who write, test, and maintain the code that powers computer software and applications.`,
        gif: G8
    },
    {
        type: "WORKOUT",
        fact: `Regular workouts can improve mood and reduce the risk of chronic diseases.`,
        gif: G9
    },
    {   type: "WATER",
        fact: `Water is the most abundant compound on Earth's surface, covering about 71% of the planet.`,
        gif: G10
    },
    
];


const randomFactFun = () => {
    const rnd = FactsAndGifs[Math.floor(Math.random()*FactsAndGifs.length)];
    return  rnd;

}


const [randomFact, setRandomFact] = useState(null);

useEffect(() => {
    const fact = randomFactFun();
    setRandomFact(fact);
  }, []);




  return (
    <Whole>
        <img src={randomFact?.gif} alt="" />
        <h4>{randomFact?.type} FUN FACT</h4>
        <h1>{randomFact?.fact}</h1>
        <span class="feed-load-loader"></span>
    </Whole>
  )
}


const Whole = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        width: 200px;
        margin-bottom: 20px;
    }


    h4 {
        font-weight: bold;
        letter-spacing: 1px;
        color: #a3a3a3;
        font-size: 18px;
    }
    h1 {
        font-size: 20px;
        padding: 0 40px;
        font-weight: bold;
        text-align: center;

    }
`

export default FeedLoading