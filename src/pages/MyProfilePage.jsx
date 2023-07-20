import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RedBtn } from '../utils/RedBtn';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';

function MyProfilePage() {


  const [profileData, setprofileData] = useState([]);
  const {user} = useAuth0();

  const getProfileData = async () => {
    try {
        const fetch = await axiosInstance.get(`/getProfileData/${user?.email}`);
        let res = await fetch.data;
        console.log(res)
        setprofileData(res);
    } catch (error) {
      console.log(error , "On profile page")
    }
  }


  useEffect(() => {
      getProfileData();
      console.log(profileData , "DHHjk")
  } , [profileData])
  return (
    <>
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
    <FollowBtn>FOLLOW</FollowBtn>
</Whole>
    </>
  )
}

const Whole = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

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

const FollowBtn = styled(RedBtn)`
  margin-top: 10px;
`
export default MyProfilePage