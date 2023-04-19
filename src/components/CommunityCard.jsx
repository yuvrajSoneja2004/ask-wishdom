import styled from '@emotion/styled'
import React from 'react'
import { RedBtn } from '../utils/RedBtn'
import { Link, useNavigate } from 'react-router-dom'

function CommunityCard({ data }) {

    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/singleCommunityPage/${data._id}`)}>
            <CommIMG>
                <img src={data.profilePicture} alt="uu" />
            </CommIMG>
            <Content>
                <h3>{data.name}</h3>
                <p>{data.desc > 20 ? data.desc.slice(0, 20) : data.desc}...</p>
                <ViewBtn>view community</ViewBtn>
            </Content>
        </Card>
    )
}


const Card = styled.div`
width: 300px;
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
min-height: 280px;
border-radius: 5px;

h3 {
    text-shadow: 0px 1px, 1px 0px, 1px 0px;

}
`

const ViewBtn = styled(RedBtn)`
    margin-top: 15px;
`

const CommIMG = styled.div`
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
padding: 7px;
border-radius: 50%;
transform: translateY(-50%);

img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
}
`

const Content = styled.div`
        transform: translateY(-20%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
`
export default CommunityCard