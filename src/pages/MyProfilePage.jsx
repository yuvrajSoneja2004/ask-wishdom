import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RedBtn } from '../utils/RedBtn';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";
import {AiOutlinePicture , AiOutlineCamera} from 'react-icons/ai'
import {MdPictureInPicture , MdOutlineCampaign} from 'react-icons/md'
import imageCompression from 'browser-image-compression'
import Putin from '../assets/putin.gif';
import Audio from '../components/Audio';


function MyProfilePage() {


  const [profileData, setprofileData] = useState([]);
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

//   // 2. Profile Background Pic
//   const handleBGPic = async (e) => {
//     const file = e.target.files[0];
// console.log("THis works but why")
//     const options = {
//       maxSizeMB: .1,
//       maxWidthOrHeight: 1920,
//       useWebWorker: true,
//   }
//   let compression = await imageCompression(file, options)
//   const reader = new FileReader();
//   reader.onload = (event) => {
//       setbgPic(event.target.result);
//   };
//   reader.readAsDataURL(compression);

//   setFinalBGpic(compression)

//   };


// 2. Profile Background Pic
const handleBGPic = async (e) => {
  const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setbgPic(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

};
// 3. Profile Background Music
const handleBGMusic = async (e) => {
  const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBgMusic(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

};

  useEffect(() => {
      getProfileData();
      console.log(finalProfileImg);
  } , [profileData])
  return (
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
      <div></div>
      <h2>Customize Profile</h2>
      <div></div>
    </CustomizeHeading>
    <Btns>
      <div>
      <Btn onClick={async () => {
        axiosInstance.put(`/changeProfilePic/${user?.email}`, {
          userProfilePic : profilePic
        })
      }}>  <AiOutlinePicture style={{marginRight: '5px'}} size={20} />  Change Profile Pic </Btn>
      <input type="file" name="" id=""  accept="image/*" onChange={handleProfilePic}/>
      </div>
      
      <div>
      <Btn onClick={async () => {
        console.log(finalBgPic)
        axiosInstance.put(`/changeBGPhoto/${user?.email}`, {
          userProfilePic : profilePic
        })
        
      }}> <MdPictureInPicture style={{marginRight: '5px'}} size={20} />  Change Banner Pic</Btn>
      <input type="file" name="" id="" accept='image/*' />
      </div>
      <div>
      <Btn onClick={async () => {
        axiosInstance.put(`/changeBGPhoto/${user?.email}`, {
          userProfileBG : bgPic
        })
      }}>  <AiOutlineCamera style={{marginRight: '5px'}} size={20} />  Choose Background Pic</Btn>
      <input type="file" name="" id="" onChange={handleBGPic} />
      </div>
     <div>
     <Btn onClick={async () => {
      axiosInstance.put(`/changeBgMusic/${user?.email}`, {
        userProfileBGMusic : bgMusic
      })
     }}>  <MdOutlineCampaign style={{marginRight: '5px'}} size={20} />  Choose Background Music</Btn>
     <input type="file" name="" id="" onChange={handleBGMusic} />
     </div>
    </Btns>
    
</Whole>
<audio controls>
        {/* Use the 'src' attribute with the base64 data */}
        <source src={`data:audio/mp3;base64,${profileData[0]?.userProfileBGMusic}`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
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