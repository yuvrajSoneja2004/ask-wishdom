import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RedBtn } from '../utils/RedBtn';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";
import {AiOutlinePicture , AiOutlineCamera} from 'react-icons/ai'
import {MdPictureInPicture , MdOutlineCampaign} from 'react-icons/md'
import {MdGridView} from 'react-icons/md'
import {BsQuestionCircle} from 'react-icons/bs'
import {FiUserCheck} from 'react-icons/fi'
import {BiGroup} from 'react-icons/bi'
import imageCompression from 'browser-image-compression'
import Audio from '../components/Audio';
import OffCanvasToggle from '../components/OffCanvas';
import QuestionsAsked from '../components/Typeofposts/QuestionsAsked';
import JoinedCommunities from '../components/Typeofposts/JoinedCommunities';

// Type of posts components imports



function MyProfilePage() {


   // * REQUIRED STATE DECLARATIONS
  const [profileData, setprofileData] = useState([]);
  const [isLoading , setIsLoading] = useState(true);

  // Type of post view handling
  const [typeOfPosts , setTypeOfPosts] = useState(0)
  const {user} = useAuth0();

  const getProfileData = async () => {
    try {
        const fetch = await axiosInstance.get(`/getMyProfile/${user?.email}`);
        let res = await fetch.data;
        setprofileData(res);
        setIsLoading(false)
    } catch (error) {
    }
  }
  

  useEffect(() => {
      getProfileData();
  } , [profileData])
  return (
    !isLoading ? (
      <MAX style={{backgroundImage: `url(${profileData[0]?.userProfileBG})` , backgroundPosition: 'center',backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}>
    
<Whole>
  <Audio path={profileData[0]?.userProfileBGMusic}/>  
  
    <ProfileIMG style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain'}}>
    <img src={profileData[0]?.userProfilePic} alt="" />
    </ProfileIMG>
    <UssrName>{profileData[0]?.userProfileName}</UssrName>
    
    <ProfileStats>
      <div>
        <h5>{profileData[0]?.following.length}</h5>
        <h4>Following</h4>
      </div>
      <div>
        <h5>{profileData[0]?.followers.length}</h5>
        <h4>Followers</h4>
      </div>
      <div>
        <h5>0</h5>
        <h4>All Posts</h4>
      </div>
    </ProfileStats>
    <Desc>{profileData[0]?.userDesc}</Desc>
    <CustomizeHeading>
      
      {/* Toggle here  */}
      {
        !isLoading ? (
          <OffCanvasToggle data={profileData[0]}/>
        ) : "Not Loaded Yet"
      }
 
    </CustomizeHeading>
    
    <div style={{width: '100%' , height: '1px' , border: '1px solid #b8b8b8'}}></div>


    <UserPostsSet>
      <div onClick={() => setTypeOfPosts(0)}> <MdGridView size={20}/> <span>POSTS</span></div>
      <div onClick={() => setTypeOfPosts(1)}> <BsQuestionCircle size={20}/> <span>QUESTIONS ASKED</span></div>
      <div onClick={() => setTypeOfPosts(2)}> <FiUserCheck size={20}/> <span>CREATED COMMUNITIES</span></div>
    </UserPostsSet>
    <PostsContectArea>
      {/* Change type of content data here */}
        {
         typeOfPosts === 0 ? <h1>Posts component</h1> : typeOfPosts === 1 ? <QuestionsAsked userEmailData={profileData[0]?.userEmail}/> : typeOfPosts === 2 ? <JoinedCommunities  userEmailData={profileData[0]?.userEmail}/> : "nope" 
        }
    </PostsContectArea>
</Whole>

    </MAX>
    ) : "Loading..."
  )
}




const PostsContectArea = styled.div`
  width: 100%;
`



const UserPostsSet = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 12px;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;

    span {
      margin-left: 4px;
    }
  }

`
const Desc = styled.p`
  padding: 30px 0;
  text-align: center;
  line-height: 27px;
  font-weight: 500;
  letter-spacing: 1px;
  width: 500px;
`


const UssrName = styled.h1`
  font-weight: bolder;
  margin-top: 10px;
  letter-spacing: 1px;
  text-shadow: 0px 1px, 1px 0px, 1px 1px;
margin-bottom: 20px;
`

const CustomizeHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  text-align: center;
  width: 50%;
  div {
    width: 50%;
    height: 3px;
    border-bottom: 4px double black;
  }
  h2 {
    font-family: 'Lumanosimo', cursive !important;
  }
`

const MAX = styled.div`
  min-height: 100vh;
  padding: 0 100px;
`

const Whole = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
/* transform: translateY(-125px); */


`

const ProfileIMG = styled.div`
    width: 150px;
    height: 150px;
    margin-top: 30px;
    border-radius: 50%;
    border: 5px solid #B13634;
    /* padding: 10px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
`
const ProfileStats = styled.div`
  div {
    text-align: center;
  }
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  h4 {
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 20px;
    color: #B13634;
  }
  h5 {
    font-weight: bolder;
    text-shadow: 0px 1px, 1px 0px, 1px 1px;

  }
`
const Btn = styled(Button)`
  background-color: #b92b27;
color: #fff;
&&:hover {
    background-color: #b13634;
}
`

const Btns = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 13px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`
export default MyProfilePage