import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import SiteIcon from '../assets/sitelogo.png';
import { AiFillHome, AiOutlineCompass, AiOutlineGroup, AiOutlineQuestionCircle, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai';
import {HiOutlineUserGroup} from 'react-icons/hi'
import { useGlobal } from '../context/global';
import UserIcon from '../assets/user.png';
import AlertDialogSlide from './PostFeedDialogue';



function CommunitiesSidebar() {


    const ICON_SIZE = 25;

    const [userCommunities , setUserCommunities] = useState([]);
    const [isLoadingSidebar , setIsLoadingSidebar] = useState(true);

    let { isLoading  , user} = useAuth0();
    let {  getUserProfileData , getCurrentUserProfileData } = useGlobal();
    


   useEffect(() => {
    getUserProfileData(user?.email);
   } , [user?.email]);

//     const getUserCommunities = async () => {
//         try {
//             let fetch = await axiosInstance.get(`/getusercommunities/${user.email}`);
//             let fetchRes = await fetch.data;
//             setUserCommunities(fetchRes);
//             setIsLoading(false);
//             console.log(user)
//         } catch (error) {
//             console.log("DA cause" + error);
//         }
//     }

// useEffect(() => {
  

//     getUserCommunities();
// } , [])




    return (
      <>
      <div>
        
      <Whole>
        <Logo src={SiteIcon}></Logo>
        <MenuItems>
        <RouteLink to={'/feed'}><AiFillHome size={ICON_SIZE} fill='#000'/><p>Home</p></RouteLink>
        <RouteLink to={'/'}><AiOutlineCompass size={ICON_SIZE} fill='#000'/><p>Explore Questions</p></RouteLink>
        <RouteLink to={'/ask'}><AiOutlineQuestionCircle size={ICON_SIZE} fill='#000'/><p>Ask Question</p></RouteLink>
        <AlertDialogSlide />
        <RouteLink to={'/communities'}><HiOutlineUserGroup size={ICON_SIZE} fill='#000' /><p>Communities</p></RouteLink>
        <RouteLink to={`/myProfile/:userEmail`}><div><img src={ getCurrentUserProfileData === null ? UserIcon : getCurrentUserProfileData[0]?.userProfilePic || UserIcon} alt="" /></div><p>Profile</p></RouteLink>
        </MenuItems>
      </Whole>
      </div>
      </>
    )
}


{/* <Whole>
<Link to='/createCommunity' style={{ textDecoration: 'none' }}>
    <CreateCommunityBtn>
        <IconAdd />
        <p>Create Community</p>
    </CreateCommunityBtn>
</Link>
{
isLoading ? <Loader /> : (
    <SingleCommunityRows>
    <strong> <AssuredWorkloadIcon />  Your Communities</strong> <br />
    {/* Will map the communities here  */}
    // <UserCommunities>
    {/* {
        userCommunities.map((com) => {
            return   <div>
                <img src={com?.profilePicture} alt="lol"  width={45}/>
                 <ComLink to={`/singleCommunityPage/${com?._id}`}>{com?.name}</ComLink>
                </div>
           
        })
//     } */}
    
//        {
//         userCommunities.length === 0 ? "No Created Communities" : userCommunities.map((com) => {
//             return <div>
//             <img src={com?.profilePicture} alt="lol"  width={45}/>
//              <ComLink to={`/singleCommunityPage/${com?._id}`}>{com?.name}</ComLink>
//             </div>
//         })
//        }
        
    

//      </UserCommunities>
    
// </SingleCommunityRows>
// )
// }

// </Whole> */}

const Logo = styled.img`
    width: 100px;
`

const MenuItems = styled.div`

display: flex;
flex-direction: column;
margin-top: 60px;
gap: 10px;
width: 100%;



`


const RouteLink  = styled(Link)`

    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 15px 8px;
    width: 100%;

    div {
        width: 40px;
        height: 40px;
        border: 3px solid #B13634;
        border-radius: 50%;
    }

    div img {
      
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    &&:hover {
        background-color: green;
    }


    p {
        font-weight: bold;
        letter-spacing: 1px;
        font-size: 15px;
      
        color: #000;
    }

`




//--------------------------------------

const ComLink = styled(Link)`
    color: #000;
    text-decoration: none;
`

const UserCommunities = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
margin-top: 30px;



div img {
    border-radius: 50%;
    height: 45px;
    margin-right: 7px;
    border: 3px solid #b92b27;
    padding: 2px;
}

`

const Whole = styled.div`
width: 250px;
height: 100vh;
background: #F1F2F2;
display: flex;
justify-content: start;
position: fixed;
align-items: start;
flex-direction: column;
padding: 30px 20px;
@media screen and (max-width:1018px){
    display: none;
  }

`

const IconAdd = styled(AddIcon)`
    
    background: #E6E7E8;
    border-radius: 4px;
    padding: 3px;
`
const SingleCommunityRows = styled.div`
margin-top: 30px;

strong {
    margin-bottom: 20px;
}
`
const CreateCommunityBtn = styled.button`

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ECEDED;
    border-radius: 4px;
    border: none;
    gap: 5px;
    padding: 10px 15px;
  

`




export default CommunitiesSidebar