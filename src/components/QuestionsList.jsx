import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'
import QuestionCard from './QuestionCard'

function QuestionsList() {
    return (
        <QuestionsGrid>
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
        </QuestionsGrid>
    )
}

const QuestionsGrid = styled.div`
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr   ;
place-items: center;
padding: 50px;
gap: 40px;


 @media screen and (max-width: 1446px){
    grid-template-columns: 1fr 1fr;
 }
  @media screen and (max-width: 1049px){
    grid-template-columns: 1fr;

 }
 @media screen and (max-width:488px){
    padding: 15px;
    gap: 15px;
 }

`


export default QuestionsList