import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import Loader from '../Loader';
import CommunityCard from '../CommunityCard';
import styled from '@emotion/styled';

function JoinedCommunities({userEmailData}) {
    let {user} = useAuth0();

    const [userCommunities , setUserCommunities] = useState([]);
    const [isLoading , setIsLoading] = useState(true);

useEffect(() => {
    const getUserCommunities = async () => {
        try {
            let fetch = await axiosInstance.get(`/getusercommunities/${userEmailData}`);
            let fetchRes = await fetch.data;
            setUserCommunities(fetchRes);
            setIsLoading(false);
        } catch (error) {
            console.log("error cause" + error);
        }
    }

    getUserCommunities();
} , [])
        if(isLoading){
            return <Loader />
        }
  return (
    <Whole>
    {
        userCommunities.length === 0 ? `No Created Communities.` : userCommunities.map((com , i) => {
            return <CommunityCard data={com} key={i} />
        })
    }
    </Whole>
  )
}

const Whole = styled.div`
padding-top: 120px;
`

export default JoinedCommunities