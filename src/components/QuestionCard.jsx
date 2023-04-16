import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { RedBtn } from '../utils/RedBtn'
import { Link } from 'react-router-dom'

function QuestionCard({ data }) {
    return (
        <div>
            <Card>
                <h4> Q: {data.heading}</h4>
                <p>{data.questionDesc.slice(0, 30)}...</p>
                <AskedUser>
                    <img src={data.userDetails.profileURL} alt="me" width={40} />
                    <span><strong>{data.userDetails.profileName}</strong> asked this question</span>
                </AskedUser>
                <Link to={`/readDefaultQuestion/${data._id}`}>  <RedBtn>View Answers</RedBtn></Link>
            </Card>
        </div>
    )
}

const Card = styled.div`
border-radius: 4px;
background-color: #F1F2F2;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
width: 400px;
display: flex;
flex-direction: column;
gap: 20px;
height: 310px;
padding: 20px;

h4 , p  {
    width: 200px;
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

const AskedUser = styled.div`
margin: 7px 0;
    img {
        border-radius: 50%;
        margin-right:8px;
    }
    span {
        width: 10px;
    }
`




export default QuestionCard