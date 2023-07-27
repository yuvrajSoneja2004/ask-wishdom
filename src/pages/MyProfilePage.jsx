import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RedBtn } from '../utils/RedBtn';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";
import {AiOutlinePicture , AiOutlineCamera} from 'react-icons/ai'
import {MdPictureInPicture , MdOutlineCampaign} from 'react-icons/md'
import imageCompression from 'browser-image-compression'
import Audio from '../components/Audio';
import OffCanvasToggle from '../components/OffCanvas';


function MyProfilePage() {


  const [profileData, setprofileData] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  // Profile Pic States
  const [profilePic, setprofilePic] = useState("")
  const [finalProfileImg , setFinalProfileImg] = useState("");
  // Background Pic States
  const [bgPic, setbgPic] = useState("")
  const [finalBgPic, setFinalBGpic] = useState("")
  const [bgMusic, setBgMusic] = useState("")
  const {user} = useAuth0();

  const getProfileData = async () => {
    try {
        const fetch = await axiosInstance.get(`/getMyProfile/${user?.email}`);
        let res = await fetch.data;
        console.log(res)
        setprofileData(res);
        setIsLoading(false)
    } catch (error) {
      console.log(error , "On profile page")
    }
  }
  

  useEffect(() => {
      getProfileData();
      console.log(finalProfileImg);
  } , [profileData])
  return (
    !isLoading ? (
      <MAX style={{backgroundImage: `url(${profileData[0]?.userProfileBG})` , backgroundPosition: 'center',backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}>
      <Banner></Banner>
    
      <h1>Here</h1>
<Whole>
  <Audio path={profileData[0]?.userProfileBGMusic}/>  
  
    <ProfileIMG style={{background: `url(${profileData[0]?.userProfilePic})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain'}}></ProfileIMG>
    <h1>{profileData[0]?.userProfileName}</h1>
    
    <ProfileStats>
      <div>
        <h4>{profileData[0]?.following.length}</h4>
        <h4>Following</h4>
      </div>
      <div>
        <h4>{profileData[0]?.followers.length}</h4>
        <h4>Followers</h4>
      </div>
      <div>
        <h4>0</h4>
        <h4>All Posts</h4>
      </div>
    </ProfileStats>
    <CustomizeHeading>
      
      {/* Toggle here  */}
      {
        !isLoading ? (
          <OffCanvasToggle data={profileData[0]}/>
        ) : "Not Loaded Yet"
      }
 
    </CustomizeHeading>
    
    <audio controls>
        {/* Using the 'src' attribute with the base64 data */}
        <source src={`${profileData[0]?.userProfileBGMusic}`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
</Whole>

    </MAX>
    ) : "Loading..."
  )
}



const CustomizeHeading = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 20px;
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
const Banner = styled.div`
  
  width: 100%;
  height: 40vh;
  background-color: pink;
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
transform: translateY(-125px);


`

const ProfileIMG = styled.div`
    width: 200px;
    height: 200px;
    margin-top: 30px;
    border-radius: 50%;

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