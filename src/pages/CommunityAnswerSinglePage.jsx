import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../components/Loader'
import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useGlobal } from '../context/global';
import AnswerCard from '../components/AnswerCard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionCard from '../components/QuestionCard';


function CommunityAnswerSinglePage() {

    let { communityID } = useParams();
    let { ed } = useParams();
    let { index } = useParams();
    let { user, isAuthenticated } = useAuth0();
    const [categoryList, setCategoryList] = useState([]);
    const [tempQuestionData, setTempQuestionData] = useState({});
    const [isSingleLoading, setIsSingleLoading] = useState(true);
    const [safeTempData, setSafeTempData] = useState({});
    let question = null;
    const navigate = useNavigate();



    useEffect(() => {
        const getSingleDefaultQuestion = async (QUESTION_ID) => {
            try {
                const [res1, res2] = await Promise.all([
                    axiosInstance.get(`/getCommunityQuestion/${ed}`).then(function (response) {
                        setTempQuestionData(response.data[0]);
                        setIsSingleLoading(false);
                    }).catch(function (error) {
                        console.error(error)
                        setIsSingleLoading(false)
                    })
                ])

            } catch (error) {
                setIsSingleLoading(false);
            }
        }





        getSingleDefaultQuestion(communityID);



    }, [tempQuestionData])


    useEffect(() => {
        const getRelatedQuestions = async (CATEGORY_NAME) => {
            try {
                let fetch = await axiosInstance.get(`/relatedDefaultQuestions/${CATEGORY_NAME}`);
                let res = await fetch.data;
                setCategoryList(res);

            } catch (error) {
                console.log("😁😁😁😁")
            }
        }
        getRelatedQuestions(tempQuestionData?.category);
    }, [categoryList])

    const handleUpvote = async () => {
        try {
            await axiosInstance.put(`/defaultUpvotes/${tempQuestionData._id}`, {
                likes: [
                    ...tempQuestionData.likes,
                    user.email

                ]
            })
        } catch (error) {

        }
    }




    const deleteQuestion = async () => {
        try {
            await axiosInstance.delete(`/getSingleDefaultQuestion/delete/${tempQuestionData._id}`);
            navigate("/");
        } catch (error) {
            console.log(`Error from the client side: Reason : ${error}`)
        }
    }



    if (tempQuestionData && tempQuestionData.questions && tempQuestionData.questions[index]) {
        // Access the property safely
        question = tempQuestionData.questions[index];
    }

    return (
        tempQuestionData && !isSingleLoading ?
            <>
                <Whole>
                    <QuestionHeading>{question.heading}</QuestionHeading>
                    <AskedUser>
                        <img src={question.profileURL} alt="me" width={40} />
                        <span><h5>{question.profileName}</h5> asked this question</span>
                    </AskedUser>
                    <QuestionDescription>
                        <h1>  <HelpIcon fontSize='80' style={{ color: '#b13634' }} /> Question description</h1>
                        <p>{tempQuestionData.questionDesc}</p>

                        <button onClick={handleUpvote}>{tempQuestionData.likes?.length}likes</button>

                        {
                            !isAuthenticated ? "loading..." : tempQuestionData.profileEmail === user.email ? (
                                <Bubbly onClick={deleteQuestion}>
                                    <IconDelete />
                                </Bubbly>
                            ) :
                                (
                                    <Link to={`/answerCommQuestion/${tempQuestionData?._id}/${index}`}><OutlinedBtn>Answer</OutlinedBtn></Link>
                                )
                        }



                    </QuestionDescription>

                    {
                        !isAuthenticated || !tempQuestionData ? "loading answers...." : tempQuestionData.answers?.map((ans, i) => {
                            return <AnswerCard key={i} data={ans} />
                        })
                    }

                </Whole>
                <RelatedQuestions>
                    <h1>  <IconMore fontSize='80' style={{ color: '#b13634' }} /> Related Questions</h1>
                    {
                        categoryList.length === 0 ? "no related questions on this category" : categoryList.map((currentQ, i) => {
                            return <div key={i} style={{ padding: '20px 0' }}><QuestionCard data={currentQ} /></div>
                        })
                    }
                </RelatedQuestions>
            </>
            :
            <Loader />
    )
}

const Whole = styled.div`
margin: 30px 100px;
padding: 60px;
background: #f6f9f9;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

@media screen and (max-width: 749px){
    padding: 30px;
    margin: 15px ;
}
@media screen and (max-width: 417px){
    padding: 15px;
}

`

const IconMore = styled(ExpandMoreIcon)`
    
`

const RelatedQuestions = styled.div`
margin: 30px 100px;
padding: 60px;
@media screen and (max-width: 749px){
    padding: 30px;
    margin: 0px ;
}
@media screen and (max-width: 340px){
    text-align: center;
    h1{
        font-size: 20px;
    }
}

h1 {
    font-weight: bolder;
    color: #b13634;
    margin-bottom: 30px;

}
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
    color: #b13634;
    margin-bottom: 30px;
    @media screen and (max-width: 417px){
    font-size: 25px;
}

}h2 {
    font-weight: bolder;
    color: #b13634;
    margin-bottom: 30px;
    margin-top: 30px;

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


export default CommunityAnswerSinglePage