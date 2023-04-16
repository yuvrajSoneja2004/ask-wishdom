import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../components/Loader';

function SingleQuestionPage() {

    let { questionID } = useParams();

    const [tempQuestionData, setTempQuestionData] = useState({});

    useEffect(() => {
        const getSingleDefaultQuestion = async (QUESTION_ID) => {
            try {
                // let fetch = await axiosInstance.get(`/getSingleDefaultQuestion/${QUESTION_ID}`)
                // let res = await fetch.data;
                // setTempQuestionData(res)

                const [res1, res2] = await Promise.all([
                    axiosInstance.get(`/getSingleDefaultQuestion/${QUESTION_ID}`).then(function (response) {
                        setTempQuestionData(response.data[0]);
                    }).catch(function (error) {
                        console.error(error);
                    })
                ])

            } catch (error) {

            }
        }





        getSingleDefaultQuestion(questionID);
    }, [])
    console.log(tempQuestionData)
    return (
        tempQuestionData ?
            <>
                <Whole>
                    <QuestionHeading>{tempQuestionData.heading}</QuestionHeading>
                    <AskedUser>
                        {/* <img src= alt="me" width={40} /> */}
                        {/* <span><h5>{tempQuestionData.userDetails.profileName}</h5> asked this question</span> */}
                    </AskedUser>
                    <QuestionDescription>
                        <h1>  <HelpIcon fontSize='80' style={{ color: '#b13634' }} /> Question description</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus soluta dignissimos iste totam consectetur consequuntur mollitia officiis quos illo voluptas, voluptates asperiores, autem in, architecto laboriosam. Perferendis, autem libero provident dicta iste fugiat recusandae dolorum quasi! Cum voluptas cumque molestias! Aliquam praesentium labore obcaecati dignissimos odio quasi molestias ad voluptas.</p>
                        <OutlinedBtn>Answer</OutlinedBtn>
                    </QuestionDescription>
                </Whole>
            </>
            :
            <Loader />
    )
}

const Whole = styled.div`
margin: 30px 100px;
padding: 60px;
background: #f6f9f9;
`

const OutlinedBtn = styled.button`
    position: relative;
    margin-top: 30px;
    padding: 8px 25px;
    border: 3px solid #b13634;
    color: #b13634;
    font-weight: bold;
    background: transparent;
    letter-spacing: 3px;
    overflow: hidden;
   z-index: 99;
    transition: .4s;

    &&::before {
        content: "";
        position: absolute;
        top: 0;
        z-index: -1;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #b13634;
        transform: translateY(100%);
        transition: .4s;
       
    }
    &&:hover::before {
        transform: translateY(0);
    }

    &&:hover {
        color: #fff;
    }
`
const QuestionHeading = styled.h1`
    font-weight: bolder;
    font-size: 50px;
    text-shadow: 0px 1px, 1px 0px, 1px 0px;
`
const QuestionDescription = styled.div`
margin-top: 50px;
h1 {
    font-weight: bolder;
    /* text-shadow: 0px .5px, .5px 0px, .5px 0px; */
    color: #b13634;
    margin-bottom: 30px;

}
`
const AskedUser = styled.div`
margin: 30px 0;
    img {
        border-radius: 50%;
        margin-right:8px;
    }
    h5 {
        display: inline;
        font-weight: bolder;
    }
    span {
        width: 10px;
    }
`


export default SingleQuestionPage