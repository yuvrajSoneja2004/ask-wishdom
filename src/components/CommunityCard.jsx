import styled from '@emotion/styled'
import React from 'react'
import { RedBtn } from '../utils/RedBtn'
import { Link, useNavigate } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GroupsIcon from '@mui/icons-material/Groups';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';

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
                <div> <GroupsIcon style={{color: '#b92b27'}}/> {data.joined.length} Members  </div>
                <Additional>
                    <div> <DynamicFeedIcon style={{color: '#b92b27'}}/>  {data.questions.length} Posts</div>
                    {/* Community Cateogry  */}
                    {
                        data.commCategory === "gaming" ? (
                            <div><SportsEsportsOutlinedIcon style={{color: '#b92b27'}}/> Gaming</div>
                        ) : data.commCategory === "fashion" ? (
                            <div><CheckroomOutlinedIcon   style={{color: '#b92b27'}}/> Fashion</div>
                        ) : data.commCategory === "computer-science" ? (
                            <div><CodeOutlinedIcon   style={{color: '#b92b27'}}/> Computer Science</div>

                        ) : data.commCategory === "fitness" ? (
                            <div><FitnessCenterOutlinedIcon  style={{color: '#b92b27'}} /> Fitness</div>

                        ) : data.commCategory === "tech" ? (
                            <div><PhoneAndroidOutlinedIcon   style={{color: '#b92b27'}}/> Tech</div>

                        ) : data.commCategory === "doubts" ? (
                            <div><HelpOutlineOutlinedIcon   style={{color: '#b92b27'}}/> Doubts</div>

                        ) : (
                            <div><AddReactionOutlinedIcon   style={{color: '#b92b27'}}/> Others</div>

                        )
                    }
                </Additional>
                <ViewBtn>  <RemoveRedEyeIcon style={{margin: '0 5px'}} /> view community</ViewBtn>
            </Content>
        </Card>
    )
}




const Additional = styled.div`
    display: flex;
    gap: 400px;
    margin-top: 7px;
    font-size: 13px;
    
`
const Card = styled.div`
width: 300px;
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;min-height: 20px;
border-radius: 15px;
border: 1px solid #b92b27;
@media screen and (max-width: 850px){
        width: 100%;
}
@media screen and (max-width: 484px){
        /* width: 300px; */
}


h3 {
    text-shadow: 0px 1px, 1px 0px, 1px 0px;

}
`

const ViewBtn = styled(RedBtn)`
    transform: translateY(15px);
    display: flex;
    align-items: center;
`

const CommIMG = styled.div`
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
padding: 7px;
border: 4px solid #b92b27;
border-radius: 50%;
transform: translateY(-50%);
background-color: #fff;


img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    z-index: 999;
    background-color: #fff;
}
`

const Content = styled.div`
        transform: translateY(-20%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        gap: 13px;
        width: 100%;
        div {
            display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 10px;
    text-align: center;
        }
        
`
export default CommunityCard