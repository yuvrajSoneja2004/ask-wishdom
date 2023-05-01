import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { RedBtn } from '../utils/RedBtn'
import { Link } from 'react-router-dom'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';

function QuestionCard({ data }) {
    return (
        <Whole>
            {/* <Card>
                <h4> Q:llll {data.heading}</h4>

                <p>{data.questionDesc.slice(0, 30)}...</p>
                <AskedUser>
                    <img src={data.profileURL} alt="me" width={40} />
                    <span><strong>{data.profileName}</strong> asked this question</span>
                </AskedUser>
                <Link to={`/readDefaultQuestion/${data._id}`}>  <RedBtn>View Answers</RedBtn></Link>
            </Card> */}
            <Card>
                <Left>
                    <AskedUser>
                        <img src={data.profileURL} alt="me" width={45} />
                    </AskedUser>
                </Left>
                <Right>
                    <span>Asked 3 December 2023</span>
                    <h4>{data.heading}</h4>
                    <p>{data.questionDesc.slice(0, 30)}...</p>

                </Right>

            </Card>
            <BelowContent>
                <div>
                    <WhiteBtn disabled> <ChatIcon />{data.answers.length} Answers</WhiteBtn>
                    <WhiteBtn disabled> <ViewsIcon /> 69 VIews</WhiteBtn>

                </div>
                <Link to={`/readDefaultQuestion/${data._id}`} style={{ marginRight: '30px' }}>  <RedBtn>View Answers</RedBtn></Link>            </BelowContent>
        </Whole>
    )
}


const ChatIcon = styled(ChatBubbleIcon)`
    padding: 3px;
`
const ViewsIcon = styled(VisibilityIcon)`
    padding: 2px;
`


const WhiteBtn = styled.button`
    border: none;
    background: #fff;
    padding: 7px 15px;
    font-size: 14px;
    color: grey;
`


const Whole = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

`

const BelowContent = styled.div`
    background-color: #F1F2F2;
    padding: 0 0  0 92px;
    display: flex;
    justify-content: space-between;
    div {
        display: flex;
        gap: 15px;
    }
    button {
        margin: 20px 0;
        outline: 1px solid grey;
        outline :1px solid  #8080806d;
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