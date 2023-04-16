import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../components/Loader';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useGlobal } from '../context/global';

function SingleQuestionPage() {

    let { questionID } = useParams();
    let { user, isAuthenticated } = useAuth0();
    const [tempQuestionData, setTempQuestionData] = useState({});
    const navigate = useNavigate()

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




    console.log(user);

    const deleteQuestion = async () => {
        try {
            await axiosInstance.delete(`/getSingleDefaultQuestion/delete/${tempQuestionData._id}`);
            console.log("Successfully delete from client")
            navigate("/");
        } catch (error) {
            console.log(`Error from the client side: Reason : ${error}`)
        }
    }
    return (
        tempQuestionData ?
            <>
                <Whole>
                    <QuestionHeading>{tempQuestionData.heading}</QuestionHeading>
                    <AskedUser>
                        <img src={tempQuestionData.profileURL} alt="me" width={40} />
                        <span><h5>{tempQuestionData.profileName}</h5> asked this question</span>
                    </AskedUser>
                    <QuestionDescription>
                        <h1>  <HelpIcon fontSize='80' style={{ color: '#b13634' }} /> Question description</h1>
                        <p>{tempQuestionData.questionDesc}</p>



                        {
                            !isAuthenticated ? "loading..." : tempQuestionData.profileEmail === user.email ? (
                                <Bubbly onClick={deleteQuestion}>
                                    <IconDelete />
                                </Bubbly>
                            ) :
                                (
                                    <OutlinedBtn>Answer</OutlinedBtn>
                                )
                        }
                        {/* <OutlinedBtn>Answer</OutlinedBtn> */}
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

const IconDelete = styled(DeleteIcon)`
    
`
const Bubbly = styled(IconButton)`
margin-top: 10px;
    
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