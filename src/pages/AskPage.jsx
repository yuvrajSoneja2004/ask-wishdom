import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { RedBtn } from '../utils/RedBtn'
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function AskPage() {
    let { user } = useAuth0();
    const navigate = useNavigate();

    const [allowSubmit, setAllowSubmit] = useState(false);
    const [allowSubmitDesc, setAllowSubmitDesc] = useState(false);
    const [questionValue, setQuestionValue] = useState("")
    const [descValue, setDescValue] = useState("")
    const [userSmallDesc, setUserSmallDesc] = useState("");

    const [errorThemeQuestion, setErrorThemeQuestion] = useState({
        color: '#000'
    })

    const [errorThemeDesc, setErrorThemeDesc] = useState({
        color: '#000'
    })

    const handleQuestion = (e) => {
        setQuestionValue(e.target.value)
    }
    const handleDesc = (e) => {
        setDescValue(e.target.value)
    }

    const postQuestion = async () => {
        try {
            await axiosInstance.post("/getDefaultQuestions/upload", {
                heading: questionValue,
                userSmallDesc: userSmallDesc,
                profileURL: user.picture,
                profileName: user.name,
                profileEmail: user.email,
                questionDesc: descValue
            })

            console.log("Successfully data posted from client");
            setQuestionValue("")
            setUserSmallDesc("")
            setDescValue("")
            navigate("/")

        } catch (error) {
            console.log(`Error from client posting ${error}`)
        }
    }
    useEffect(() => {
        if (questionValue.length > 50) {
            setErrorThemeQuestion({ color: '#b92b27' })
            setAllowSubmit(true);
        }
        else {
            setErrorThemeQuestion({ color: '#000' })
            setAllowSubmit(false);

        }
    }, [questionValue])

    useEffect(() => {
        if (descValue.length > 350) {
            setErrorThemeDesc({ color: '#b92b27' })
            setAllowSubmitDesc(true);
        }
        else {
            setErrorThemeDesc({ color: '#000' })
            setAllowSubmitDesc(false);

        }
        console.log(allowSubmit)
    }, [descValue])



    return (
        <Whole>
            <QuestionTitle placeholder='Enter the Question.' onChange={handleQuestion} value={questionValue} style={errorThemeQuestion} required></QuestionTitle>
            <span style={errorThemeQuestion}>{questionValue.length}/50</span>
            <h3>Question asked by:</h3>
            <AskedBy>

                <div>
                    <img src={user ? user.picture : ""} alt='userImg' />
                </div>

                <div>
                    <strong> {user ? user.name : "Please wait..."} (you)</strong>
                    <div>
                        <SmallUserDesc placeholder='small description about yourself.' required value={userSmallDesc} onChange={(e) => {
                            setUserSmallDesc(e.target.value)
                        }} />
                    </div>
                </div>
            </AskedBy>
            <QuestionDesc placeholder='Write question description here.' required onChange={handleDesc} value={descValue}></QuestionDesc>
            <span style={errorThemeDesc}>{descValue.length}/350</span>
            <SubmitBtn disabled={allowSubmit || allowSubmitDesc ? true : false} onClick={postQuestion}>Submit</SubmitBtn>
        </Whole>
    )
}

const Whole = styled.div`
padding: 30px 100px;
h3 {
    font-weight: bolder;
    margin-bottom: 18px;
}
span {
    float: right;
}

`
const SmallUserDesc = styled.textarea`
    border: none;
    width: 100%;
    margin-left: -10px;
    &&:focus {
        outline: none;
    }
`
const SubmitBtn = styled(RedBtn)`
    margin-top: 70px;
`

const QuestionTitle = styled.textarea`
border: none;
font-size: 50px;
width: 100%;

&&:focus {
    border: none;
    outline: none;
}
`
const AskedBy = styled.div`
display: flex;

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
const QuestionDesc = styled.textarea`
border: none;
font-size: 20px;
width: 100%;

&&:focus {
    border: none;
    outline: none;
}
`

export default AskPage