import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled';
import FeedCard from '../FeedCard';
import { useGlobal } from '../../context/global';

function PostsComponent({userEmailData}) {


    const [userFeeds , setUserfeeds] = useState([])
    const [isLoading , setIsLoading] = useState(false);


    const {user} = useAuth0();


    const getUserFeeds = async () => {
        setIsLoading(true);
        try {
            const fetchData = await axiosInstance.get(`/getUserFeeds/${userEmailData}`);
            const res = await fetchData.data;
            console.log(res , 'Jo teri sang kaati raatain')
            setUserfeeds(res);


        } catch (error) {
            console.log("error occured at the time of postComponent.jsx from client" . error);
        }
        finally {
            setIsLoading(false);

        }
    }


    useEffect(() => {
        getUserFeeds()
    } , [userEmailData])

    console.log(userFeeds , "Tu zaroori")


  return (
    <Whole>
{
     userFeeds.map((feed , i) => {
         return  <FeedCard  key={i} feedData={feed}/>
     })
    }
    </Whole>
  )
}


const Whole = styled.div`
`
export default PostsComponent