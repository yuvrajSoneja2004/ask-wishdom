import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { RedBtn } from '../utils/RedBtn'
import { Link } from 'react-router-dom'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function QuestionCard({ data }) {
    return (
        <Whole>
            <Card>
                <Left>
                    <AskedUser>
                        <img src={data.profileURL} alt="me" width={45} />
                    </AskedUser>
                </Left>
                <Right>
                    <span>Asked: {data.datePosted}</span>
                    <h4>{data.heading}</h4>
                    <p>{data.questionDesc.slice(0, 30)}...</p>

                </Right>

            </Card>
            <BelowContent>
                <div>
                    <WhiteBtn disabled> <ChatIcon />{data.answers.length} Answers</WhiteBtn>
                    <WhiteBtn disabled> <ViewsIcon /> {data.views.length} Views</WhiteBtn>

                </div>
                <TheLink to={`/readDefaultQuestion/${data._id}`} style={{ marginRight: '30px' , }}>  <RedBtn style={{display: 'flex' , alignItems: 'center', gap: '6px'}}> <QuestionAnswerIcon />  View Answers</RedBtn></TheLink>            </BelowContent>
        </Whole>
    )
}


const TheLink = styled(Link)`
text-decoration: none;
    @media screen and (max-width: 428px) {
        margin: 0 !important;

    }
`


const ChatIcon = styled(ChatBubbleIcon)`
    padding: 3px;
`
const ViewsIcon = styled(VisibilityIcon)`
    padding: 2px;
`


const WhiteBtn = styled.button`
    border: none;
    background: #ffffff;
    padding: 7px 15px;
    font-size: 14px;
    color: grey;
`


const Whole = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`

const BelowContent = styled.div`
    background-color: #F1F2F2;
    padding: 0 0  0 92px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 631px){
        padding: 0 0 0 20px;
    }
    @media screen and (max-width: 428px) {
            flex-direction: column;
            padding: 0 20px 0 20px;
            justify-content: center;
        }
    div {
        display: flex;
        gap: 15px;
        @media screen and (max-width: 428px) {
            
        }
    }
    button {
        margin: 20px 0;
        outline: 1px solid grey;
        outline :1px solid  #8080806d;
        @media screen and (max-width: 631px){
        font-size: 10px;
    }
    @media screen and (max-width: 428px) {
            width: 100%;
        }
    }

`
const Card = styled.div`
background-color: #fff;
width: 100%;
display: flex;
min-height: 100px;
column-gap: 20px;
padding: 20px;
@media screen and (max-width: 749px){
    
}

h4 , p  {
    width: 100%;
}

@media screen and (max-width: 1049px){
    width: 100%;
 }
h4 {
    font-weight: bolder;
    line-height: 31px;
}

@media screen and (max-width:488px){
    h4 {
        font-size: 20px;
    }
    p {
        font-size: 15px;
    }
}
`

const Left = styled.div``
const Right = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
span {
    font-size: 13px;
    color: grey;
}
p {
    color: grey;
}
`

const AskedUser = styled.div`
margin: 7px 0;
    img {
        border-radius: 50%;
        margin-right:8px;
        padding: 2px;
        border: 3px solid #b92b27;

    }
    span {
        width: 10px;
    }
    
`




export default QuestionCard