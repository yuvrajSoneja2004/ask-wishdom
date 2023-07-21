import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { RedBtn } from '../utils/RedBtn';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

function SingleProfilePage() {

    const {userID } = useParams();
    const {user} = useAuth0();


    const handleFollow = async () => {
        try {
            
            const fetch = await axiosInstance.post(`/follow`, {
                currentUserE: user?.email,
                userToFollowE: profileData[0].userEmail
            });
            let res = await fetch.data;
            console.log("FOllow " , res)
            
        } catch (error) {
          // MEANS already following
            console.log(error )

            if(error.response.data.isAlreadyFollowing){
             
            }
            
        }
    }


  const [profileData, setprofileData] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = async () => {
    try {
        console.log(`what defik ${userID}`)
        const fetch = await axiosInstance.get(`/getProfileData/${userID}`);
        let res = await fetch.data;
        setprofileData(res);
    } catch (error) {
      console.log(error , "On profile page")
    }
  }


  const checkIfFollowed = async () => {
    try {
      let fetch = await axiosInstance.get(`/isAlreadyFollowed/${profileData[0].userEmail}/${user?.email}`);
      let res = fetch.data;
      console.log(res , "LES GO")
      setIsLoading(false)
      
    } catch (error) {
      console.log(error , "wj")
      if(error.response.data.isAlreadyFollowing){
             setIsFollowed(true);
             setIsLoading(false);
      }
      else {
        setIsFollowed(false);
             setIsLoading(false);
      }
    }
  }

  useEffect(() => {
      getProfileData();
      console.log(profileData , "DHHjk")
  } , [])

  useEffect(() => {
    checkIfFollowed()
  } , )
  useEffect(() => {
      setIsFollowed(isFollowed)
  } , [isFollowed])

if(isLoading){
    return <h1>LOadng...</h1>
}
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
   {
    !isFollowed ?  <FollowBtn onClick={handleFollow}>FOLLOW</FollowBtn> : <FollowBtn>UNFOLLOW</FollowBtn>
   }
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
export default SingleProfilePage