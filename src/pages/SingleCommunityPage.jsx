import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryIcon from '@mui/icons-material/Category';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DescriptionIcon from '@mui/icons-material/Description';
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../components/Loader'
import { RedBtn } from '../utils/RedBtn'
import { useAuth0 } from '@auth0/auth0-react';
import QuestionCard from '../components/QuestionCard';
import CommunityQuestionCard from '../components/CommunityQuestionCard';

function SingleCommunityPage() {

    let { communityID } = useParams();
    const [singleCommunityData, setSingleCommunityData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userAlreadyJoined, setUserAlreadyJoined] = useState(false);
    let { user } = useAuth0();
    const navigate = useNavigate();


    const getSingleCommunity = async () => {
        try {
            let fetch = await axiosInstance.get(`/getSingleCommunity/${communityID}`);
            let res = await fetch.data;
            setIsLoading(true)
            setSingleCommunityData(res[0]);
        } catch (error) {
            // will do error handling with DOM later :P
            console.log("Error while fetching single community data from client-side. Cause:", error)
        }
    }

    const joinComm = async () => {
        try {
            let fetch = await axiosInstance.put(`/join/${singleCommunityData._id}`, {
                joined: [
                    ...singleCommunityData?.joined,
                    {
                        name: user?.name,
                        email: user?.email,
                        profilePic: user?.picture
                    }
                ]
            })

            let res = await fetch.data;
        } catch (error) {
            console.log("Error man joinComm", error)
        }
    }



    // ? Checks wheather user already followed or not
    const checkIfJoined = () => {
        const email = user?.email;
        const isJoined = singleCommunityData?.joined?.some((member) => member.email === email);
        if (isJoined) {
            setUserAlreadyJoined(true);
        }
    };


    useEffect(() => {
        getSingleCommunity();
        checkIfJoined();
    }, [singleCommunityData])
    if (!isLoading) {
        return <Loader />
    }
    return (
        <Whole>
            <Poster style={{ background: `url(${singleCommunityData?.bannerPicture})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <CommunityLogo>
                    <img src={singleCommunityData?.profilePicture} alt="lll" />
                    <h1>{singleCommunityData?.name}</h1>
                    <span><strong>{singleCommunityData.joined?.length}</strong> Memebers</span>
                    {
                        userAlreadyJoined ? <RedBtn style={{ margin: '10px 0' }} disabled>Joined</RedBtn> : <RedBtn style={{ margin: '10px 0' }} onClick={joinComm}>Join</RedBtn>
                    }
                    <div>
                        <CategoryIndicator><CategoryIcon />{singleCommunityData?.commCategory}</CategoryIndicator>
                        <div><DateRangeIcon />{singleCommunityData?.dateCreated}</div>
                    </div>
                    <main>
                        <h4> <DescIcon />  Description</h4>
                        <p>{singleCommunityData?.desc}</p>
                    </main>
                </CommunityLogo>

            </Poster>
            <Cen>
                {userAlreadyJoined ? <PostBtn onClick={() => navigate(`/askCommunityPage/${singleCommunityData?._id}`)}>POST something</PostBtn> : ""}
            </Cen>
            <QuestionsGrid>
                {
                    singleCommunityData?.questions.map((question, i) => {
                        return <CommunityQuestionCard data={question} no={i} key={i} comID={singleCommunityData?._id} />
                    })
                }
            </QuestionsGrid>
        </Whole>
    )
}



const QuestionsGrid = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 50px;
margin-top: 400px;
gap: 40px;


 @media screen and (max-width: 1446px){
    grid-template-columns: 1fr 1fr;
 }
  @media screen and (max-width: 1049px){
    grid-template-columns: 1fr;

 }
 @media screen and (max-width:488px){
    padding: 15px;
    gap: 15px;
 }

`

const Cen = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    position: relative;
    margin: 30px 30px 0 0 ;

    @media screen and (max-width: 560px){
        justify-content: center;
        margin: 0;
        position: fixed;
        top: 500px;
        left: 0;
        bottom: 100px;
        right: 0;
    }
    
`

const PostBtn = styled(RedBtn)`
`


const DescIcon = styled(DescriptionIcon)`
    margin-right: 10px;
`


const CommunityLogo = styled.main`
    min-width: 200px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(75%);

    @media screen and (max-width: 600px){
        width: 100%;
    }
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
    }
    h1 {
        font-weight: bolder;
        text-shadow: 0px 1px, 1px 0px, 1px 0px;

    }
    div {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }
    main {
        text-align: center;
        @media screen and (max-width: 600px){
        width: 100%;
    }
    }
    main h4 {
        font-weight: bolder;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;

    }
    main p {
        width: 500px;
        @media screen and (max-width: 600px){
        width: 100%;
    }
    }
`

const CategoryIndicator = styled.div`
text-transform: capitalize;
`
const Whole = styled.div`
    padding: 0 0 80px 0;
`;


const Poster = styled.div`
width: 100%;
min-height: 100px;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;



`
export default SingleCommunityPage