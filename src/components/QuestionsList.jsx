import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import QuestionCard from './QuestionCard'
import { useGlobal } from '../context/global'
import { useEffect } from 'react'
import NoDefaultQuestions from './NoDefaultQuestions'
import { axiosInstance } from '../utils/axiosInstance'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { v4 } from 'uuid'

function QuestionsList() {
    const { defaultQuestions, getDefaultQuestions } = useGlobal()
    const [userCheckData, setuserCheckData] = useState([]);

    const {user} = useAuth0();

    const checkUserExistance = async () => {
        let date = new Date();
       try {
        let fetch = user ? await  axiosInstance.post(`/myProfile/${user.email}` , {
                dateCreated: date.toDateString(),
                followers: [],
                following: [],
                userEmail: user.email,
                userProfilePic: user.picture,
                userProfileName: user.name,
                userID : v4()


        }) : ""
       let res = await fetch.data;
       setuserCheckData(res);
       console.log(res)
       } catch (error) {
        console.log(" error man man" , error);
       }
    }

    useEffect(() => {
        getDefaultQuestions();
        checkUserExistance()
        console.log(userCheckData);
    }, [])


    return (
        <QuestionsGrid>
            {
                defaultQuestions?.length === 0 ? <NoDefaultQuestions />:(
                    defaultQuestions?.map((question, i) => {
                        return <QuestionCard data={question} key={i} />
                    })
                )
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
margin-bottom: 30px;


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