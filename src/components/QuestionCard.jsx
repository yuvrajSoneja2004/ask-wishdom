import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { RedBtn } from '../utils/RedBtn'

function QuestionCard({ data }) {
    return (
        <div>
            <Card>
                <h4> Q: {data.heading}</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quasi!...</p>
                <AskedUser>
                    <img src="https://lh3.googleusercontent.com/a/AGNmyxarWgWl3myWAefLu2SsAEvK6h6KkhrcPTZbwuEW=s96-c" alt="me" width={40} />
                    <span><strong>Yuvraj Soneja</strong> asked this question</span>
                </AskedUser>
                <RedBtn>View Answers</RedBtn>
            </Card>
        </div>
    )
}

const Card = styled.div`
border-radius: 4px;
background-color: #F1F2F2;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
min-height: 100px;
padding: 20px;
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

const AskedUser = styled.div`
margin: 7px 0;
    img {
        border-radius: 50%;
        margin-right:8px;
    }
`




export default QuestionCard