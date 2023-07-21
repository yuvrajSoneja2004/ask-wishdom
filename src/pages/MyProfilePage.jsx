import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RedBtn } from '../utils/RedBtn';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";
import {AiOutlinePicture , AiOutlineCamera} from 'react-icons/ai'
import {MdPictureInPicture , MdOutlineCampaign} from 'react-icons/md'
import imageCompression from 'browser-image-compression'


function MyProfilePage() {


  const [profileData, setprofileData] = useState([]);
  const [profilePic, setprofilePic] = useState("")
  const [finalProfileImg , setFinalProfileImg] = useState("");
  const {user} = useAuth0();

  const getProfileData = async () => {
    try {
        const fetch = await axiosInstance.get(`/getMyProfile/${user?.email}`);
        let res = await fetch.data;
        console.log(res)
        setprofileData(res);
    } catch (error) {
      console.log(error , "On profile page")
    }
  }
  // ?* Handle Image Compression inputs

  // 1. Profile Pic
  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: .1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
  }
  let compression = await imageCompression(file, options)
  const reader = new FileReader();
  reader.onload = (event) => {
      setprofilePic(event.target.result);
  };
  reader.readAsDataURL(compression);

  setFinalProfileImg(compression);
  };

  useEffect(() => {
      getProfileData();
  } , [profileData])
  return (
    <MAX>
      <Banner></Banner>
<Whole>
  
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
      <div></div>
      <h2>Customize Profile</h2>
      <div></div>
    </CustomizeHeading>
    <Btns>
      <div>
      <Btn onClick={async () => {
        axiosInstance.put("/changeProfilePic", {
            // Continue
        })
      }}>  <AiOutlinePicture style={{marginRight: '5px'}} size={20} />  Change Profile Pic </Btn>
      <input type="file" name="" id=""  accept="image/*" onChange={handleProfilePic}/>
      <img src={profilePic} alt="" />
      </div>
      
      <div>
      <Btn>  <MdPictureInPicture style={{marginRight: '5px'}} size={20} />  Change Banner Pic</Btn>
      <input type="file" name="" id="" />
      </div>
      <div>
      <Btn>  <AiOutlineCamera style={{marginRight: '5px'}} size={20} />  Choose Backhround Pic</Btn>
      <input type="file" name="" id="" />
      </div>
     <div>
     <Btn>  <MdOutlineCampaign style={{marginRight: '5px'}} size={20} />  Choose Background Music</Btn>
     <input type="file" name="" id="" />
     </div>
    </Btns>
</Whole>
    </MAX>
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
  background-color: blue;
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