import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
function CommunitiesSidebar() {

    let {user} = useAuth0();

    const [userCommunities , setUserCommunities] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const getUserCommunities = async () => {
        try {
            let fetch = await axiosInstance.get(`/getusercommunities/${user.email}`);
            let fetchRes = await fetch.data;
            setUserCommunities(fetchRes);
            setIsLoading(false);
            console.log(user)
        } catch (error) {
            console.log("DA cause" + error);
        }
    }

useEffect(() => {
  

    getUserCommunities();
} , [])

    return (
        <Whole>
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
                <UserCommunities>
                {/* {
                    userCommunities.map((com) => {
                        return   <div>
                            <img src={com?.profilePicture} alt="lol"  width={45}/>
                             <ComLink to={`/singleCommunityPage/${com?._id}`}>{com?.name}</ComLink>
                            </div>
                       
                    })
                } */}
                
                   {
                    userCommunities.length === 0 ? "No Created Communities" : userCommunities.map((com) => {
                        return <div>
                        <img src={com?.profilePicture} alt="lol"  width={45}/>
                         <ComLink to={`/singleCommunityPage/${com?._id}`}>{com?.name}</ComLink>
                        </div>
                    })
                   }
                    
                
            
                 </UserCommunities>
                
            </SingleCommunityRows>
            )
           }

        </Whole>
    )
}


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
width: 300px;
height: 90vh;
background: #F1F2F2;
display: flex;
justify-content: start;
align-items: center;
flex-direction: column;
padding: 20px;
@media screen and (max-width:696px){
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