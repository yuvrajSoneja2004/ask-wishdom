import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { RedBtn } from '../utils/RedBtn'
import { axiosInstance } from '../utils/axiosInstance';
import { NavLink, useNavigate } from 'react-router-dom';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import Dropdown from 'react-bootstrap/Dropdown';

function AskPage() {
    let { user } = useAuth0();
    const navigate = useNavigate();

    const [allowSubmit, setAllowSubmit] = useState(false);
    const [allowSubmitDesc, setAllowSubmitDesc] = useState(false);
    const [questionValue, setQuestionValue] = useState("")
    const [descValue, setDescValue] = useState("")
    const [userSmallDesc, setUserSmallDesc] = useState("");
    const [tempCategory, setTempCategory] = useState("others");

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
            let date = new Date();
            await axiosInstance.post("/getDefaultQuestions/upload", {
                heading: questionValue,
                userSmallDesc: userSmallDesc,
                profileURL: user.picture,
                profileName: user.name,
                profileEmail: user.email,
                questionDesc: descValue,
                category: tempCategory,
                datePosted: date.toDateString()
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
            <AskCategory> <h3>Category:</h3>
                <div>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("gaming")}>  <SportsEsportsOutlinedIcon /> Gaming</CategoryLink>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("fashion")}>  <CheckroomOutlinedIcon /> Fashion</CategoryLink>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("computer-science")}>  <CodeOutlinedIcon /> Computer Science</CategoryLink>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("fitness")}>  <FitnessCenterOutlinedIcon /> Fitness</CategoryLink>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("tech")}>  <PhoneAndroidOutlinedIcon /> Tech</CategoryLink>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("doubts")}>  <HelpOutlineOutlinedIcon /> Doubts</CategoryLink>
                    <CategoryLink to={"/ask"} onClick={() => setTempCategory("others")}>  <AddReactionOutlinedIcon /> Others</CategoryLink>
                </div>

            </AskCategory>
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
const CategoryLink = styled(NavLink)`
    color: #000;
    text-decoration: none;
    border: 2px solid black;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 20px;
    font-weight: bolder;

    &&:active , &&:focus {
        color: #b92b27 !important;
        border: 2px solid #b92b27;
    }
`
const AskCategory = styled.div`
display: flex;
align-items: center;

div {
    margin-left: 10px;
    margin-top: -10px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
}
h3 {
    display: inline;
}
`

const CategoryDropdown = styled(Dropdown)
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