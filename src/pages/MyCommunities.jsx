import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import Loader from '../components/Loader';




function MyCommunities() {

    let {user} = useAuth0();

    const [userCommunities , setUserCommunities] = useState([]);
    const [isLoading , setIsLoading] = useState(true);

useEffect(() => {
    const getUserCommunities = async () => {
        try {
            let fetch = await axiosInstance.get(`/getusercommunities/${user.email}`);
            let fetchRes = await fetch.data;
            console.log(fetchRes , "MOBILE VIEW MAM NMAMAM");
            setUserCommunities(fetchRes);
            setIsLoading(false);
        } catch (error) {
            console.log("DA cause" + error);
        }
    }

    getUserCommunities();
} , [])
        if(isLoading){
            return <Loader />
        }

  return (
    <>
     <TheLink to='/createCommunity' style={{ textDecoration: 'none' }}>
                <CreateCommunityBtn>
                    <IconAdd />
                    <p>Create Community</p>
                </CreateCommunityBtn>
            </TheLink>

            <Grid>
                <UserCommunities>
            {
                    userCommunities.map((com) => {
                        return   <Dyn>
                            <img src={com?.profilePicture} alt="lol"  width={105}/>
                             <ComLink to={`/singleCommunityPage/${com?._id}`}>{com?.name}</ComLink>
                            </Dyn>
                       
                    })
                }
                </UserCommunities>
            </Grid>
    </>
  )
}
const UserCommunities = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 30px;
margin-top: 30px;`

const Dyn = styled.div`
    img {
        border-radius: 50%;
    height: 105px;
    margin-right: 7px;
    border: 3px solid #b92b27;
    padding: 2px;
    }
`

const Grid = styled.div`
display: grid;
place-items: start;
padding: 20px;
`

const ComLink = styled(Link)`
    color: #000;
    text-decoration: none;
    font-weight: bolder;
    font-size: 20px;
`

const TheLink = styled(Link)`
display: flex;
justify-content: center;
padding: 15px;
`
const IconAdd = styled(AddIcon)`
    
    background: #E6E7E8;
    border-radius: 4px;
    padding: 3px;
`
const CreateCommunityBtn = styled.button`

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ECEDED;
    border-radius: 4px;
    border: none;
    gap: 5px;
    width: 100%;
    padding: 10px 15px;
  

`

export default MyCommunities