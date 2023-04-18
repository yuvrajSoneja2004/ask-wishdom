import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'
import QuestionCard from './QuestionCard'
import { useGlobal } from '../context/global'
import { useEffect } from 'react'

function QuestionsList() {
    const { defaultQuestions, getDefaultQuestions } = useGlobal()

    useEffect(() => {
        getDefaultQuestions();
    }, [])


    return (
        <QuestionsGrid>
            {
                defaultQuestions?.map((question, i) => {
                    return <QuestionCard data={question} key={i} />
                })
            }
        </QuestionsGrid>
    )
}

const QuestionsGrid = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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