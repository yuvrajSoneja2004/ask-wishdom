import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

function AskPage() {
    let { user } = useAuth0();

    const [allowSubmit, setAllowSubmit] = useState(true);
    const [questionValue, setQuestionValue] = useState("")
    const [descValue, setDescValue] = useState("")

    const [errorTheme, setErrorTheme] = useState({
        color: '#000'
    })

    const handleQuestion = (e) => {
        setQuestionValue(e.target.value)
    }
    const handleDesc = (e) => {
        setDescValue(e.target.value)
    }
    useEffect(() => {
        if (questionValue.length > 50) {
            setErrorTheme({ color: '#b92b27' })
            setAllowSubmit(false);
        }
        else {
            setErrorTheme({ color: '#000' })
        }
    }, [questionValue])

    useEffect(() => {
        if (descValue.length > 350) {
            setErrorTheme({ color: '#b92b27' })
            setAllowSubmit(false);
        }
        else {
            setErrorTheme({ color: '#000' })
        }
    }, [descValue])



    return (
        <Whole>
            <QuestionTitle placeholder='Enter the Question.' onChange={handleQuestion} value={questionValue} style={errorTheme}></QuestionTitle>
            <span style={errorTheme}>{questionValue.length}/50</span>
            <AskedBy>
                <h3>Question asked by:</h3>
                <img src={user ? user.picture : ""} alt='userImg' />

                <strong> {user ? user.name : "Please wait..."} (you)</strong>
            </AskedBy>
            <QuestionDesc placeholder='Write question description here.' onChange={handleDesc} value={descValue}></QuestionDesc>
            <span style={errorTheme}>{descValue.length}/350</span>
        </Whole>
    )
}

const Whole = styled.div`
padding: 30px 100px;
span {
    float: right;
}
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

margin-bottom: 100px;
h3 {
    font-weight: bolder;
    margin-bottom: 10px;
}
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