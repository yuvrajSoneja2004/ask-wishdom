import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import React from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function AnswerCard({ data }) {
    return (
        <Card>
            <AskedUser>
                <div>
                    <img src={data.profile} alt="me" width={40} />
                </div>
                <div>
                    <strong>{data.name}</strong>
                    <span>{data.smallDescData}</span>
                    <label>{data.datePosted}</label>

                </div>

            </AskedUser>
            <p>{data.msg}</p>
            <Upvote>
                <Bubbly>
                    <FavoriteBorderOutlinedIcon />
                </Bubbly>
                <span>0</span>
            </Upvote>
        </Card>
    )
}

const Card = styled.div`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    width: 100%;
    min-height: 200px;
    background-color:#ffffffc9;
    margin-top: 50px;
    border-radius: 5px;
    padding: 30px;

`

const Bubbly = styled(IconButton)`
    margin-left: -10px;
  
`

const Upvote = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`
const AskedUser = styled.div`
display: flex;
margin-bottom: 15px;
    img {
        border-radius: 50%;
        margin-right:8px;
    }
   div {
    display: flex;
    flex-direction: column;
   }
   span {
    font-size: 13px;
    font-style: italic;
    color: #878787;
    margin: 3px 0;
   }
   p {
    margin-top: 20px;
   }
   label {
    font-size: 10px;
   }
`

export default AnswerCard