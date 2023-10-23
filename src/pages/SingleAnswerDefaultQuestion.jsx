import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RedBtn } from '../utils/RedBtn'
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../components/Loader';

function SingleAnswerDefaultQuestion() {

    const { questionID } = useParams();
    const [userSmallDesc, setUserSmallDesc] = useState("");
    const [answerValue, setAnswerValue] = useState("");
    const [tempAnswersData, setTempAnswersData] = useState({});
    let { user } = useAuth0()
    const navigate = useNavigate();
    let deez = null;





    useEffect(() => {
      if (!setTempAnswersData == undefined) {
      }
      const getSingleDefaultQuestion = async (QUESTION_ID) => {
        try {
          const [res1, res2] = await Promise.all([
            axiosInstance
              .get(`/getSingleDefaultQuestion/${QUESTION_ID}`)
              .then(function (response) {
                setTempAnswersData(response.data[0].answers);
              })
              .catch(function (error) {
                console.error(error);
              }),
          ]);
        } catch (error) {}
      };

      getSingleDefaultQuestion(questionID);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let date = new Date();
        let requ = await axiosInstance.put(`/addquestion/${questionID}`, {
          answers: [
            ...tempAnswersData,
            {
              name: user.name,
              profile: user.picture,
              smallDescData: userSmallDesc,
              msg: answerValue,
              datePosted: date.toDateString(),
            },
          ],
        });

        let res = await requ.data;
        navigate(`/readDefaultQuestion/${questionID}`);
      } catch (error) {
        console.log("LOL error " + error);
      }
    };
    return (
        tempAnswersData ? (
            <Whole onSubmit={handleSubmit}>

                <h3>Answered by :</h3>
                <AnsweredBy>


                    <div>
                        <img src={user?.picture} alt='userImg' />
                    </div>

                    <div>
                        <strong>{user?.name} (you)</strong>
                        <div>
                            <SmallUserDesc placeholder='small description about yourself.' required value={userSmallDesc} onChange={(e) => {
                                setUserSmallDesc(e.target.value)
                            }} />
                        </div>
                    </div>
                </AnsweredBy>
                <AnswerInput placeholder='Write the answer here.' required value={answerValue} onChange={(e) => {
                    setAnswerValue(e.target.value)
                }}></AnswerInput>
                <SubmitBtn type='submit' >Sumbit</SubmitBtn>

            </Whole>
        ) :
            <Loader />
    )
}

const Whole = styled.form`
margin: 30px 100px;
padding: 60px;
background: #f6f9f9;

@media screen and (max-width: 576px){
    margin: 30px 50px;
}
@media screen and (max-width: 409px){
    margin: 30px 10px;
}
`

const SubmitBtn = styled(RedBtn)`
    
`
const SmallUserDesc = styled.textarea`
    border: none;
    width: 100%;
    margin-left: -10px;
    font-size: 15px;
    padding: 10px;
    background-color: #f6f9f9;
    &&:focus {
        outline: none;
    }
`

const AnsweredBy = styled.div`
display: flex;
margin-top: 20px;
div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
margin-bottom: 100px;
img {
    width: 55px;
    border-radius: 50%;
}
`

const AnswerInput = styled.textarea`
background-color: #f6f9f9;
font-size: 24px;
border: none;
    width: 100%;
    &&:focus {
        outline: none;
        border: none;
    }
`

export default SingleAnswerDefaultQuestion