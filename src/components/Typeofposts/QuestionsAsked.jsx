import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import QuestionCard from '../QuestionCard';
import styled from '@emotion/styled';
import Loader from '../Loader';

function QuestionsAsked({userEmailData}) {

    const [storedData , setStoredData] = useState([]);
    const [isLoading , setIsLoading ] = useState(true)

const getData = async () => {
    try {
        const fetch = await axiosInstance.get(`/typeofQuestionAsked/QuestionAsked/${userEmailData}`)
        let res = await fetch.data;
        setStoredData(res);
        setIsLoading(false)
        console.log(res , "billie jeans man")
    } catch (error) {
        console.log(error , "at QuestionAsked.jsx")
    }
}

    useEffect(() => {
       getData();
    })

    if(isLoading){
        return <Loader />
    }
  return (
   <>
   <Grid>
   {
    storedData.map((q) => {
        return <QuestionCard data={q} />
    })
   }
   </Grid>
   
   </>
  )
}


const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 40px;
`
export default QuestionsAsked