import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';
function CommunitiesSidebar() {

    let {user} = useAuth0();

    const [userCommunities , setUserCommunities] = useState([]);

useEffect(() => {
    const getUserCommunities = async () => {
        try {
            let fetch = await axiosInstance.get(`/getusercommunities/${user.email}`);
            let fetchRes = await fetch.data;
            console.log(fetchRes , "AHAHAHAHAHAHA LAPTOP NEQW");
            setUserCommunities(fetchRes);
        } catch (error) {
            console.log("DA cause" + error);
        }
    }

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
            <SingleCommunityRows>
                <strong>Your Communities</strong> <br />
                {/* Will map the communities here  */}
                <UserCommunities>
                {
                    userCommunities.map((com) => {
                        return   <div>
                            <img src={com?.profilePicture} alt="lol"  width={50}/>
                             <Typography variant='p'>{com?.name}</Typography>
                            </div>
                       
                    })
                }
                 </UserCommunities>
                
            </SingleCommunityRows>

        </Whole>
    )
}

const UserCommunities = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
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