import styled from '@emotion/styled'
import React , {useEffect, useState} from 'react'
import FeedCard from '../components/FeedCard'
import { ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGlobal } from '../context/global';
import { axiosInstance } from '../utils/axiosInstance';
import FeedLoading from '../components/FeedLoading';




function Feed() {

    let { user } = useAuth0();
    let { getUserProfileData , getCurrentUserProfileData } = useGlobal();
    
    const [allFeeds , setAllFeeds] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    
    
    
    // useEffect(() => {
    // getUserProfileData(user?.email);
    // } , [user?.email]);
    
    const getFeeds = async () => {
        setIsLoading(true)
        try {
            const fetchData = await axiosInstance.get("/feeds");
            const res = await fetchData.data;
            console.log(res , "Teri aurrrr :(")
            setAllFeeds(res);
            setIsLoading(false)
        } catch (error) {
            console.log("Error at the time of fetching the list of feeds. Error from client side" , error)
        }
    }
    
    useEffect(() => {
        getFeeds();
    } , [])


    // feedAuthorName
  return (
   <Divider>
   {
    !isLoading ?  <FeedSection>  
    {
     allFeeds.map((feed , i) => {
         return  <FeedCard  key={i} feedData={feed}/>
     })
    }
 </FeedSection> : <FeedLoading />
   }
    <AlsoFollowBar>
        <h1>You may also follow</h1>
    </AlsoFollowBar>
   </Divider>
  )
}



const Divider = styled.div`
    display: grid;
    grid-template-columns: 73% auto;
    @media screen and (max-width: 747px){
    grid-template-columns: auto;
}
`


const FeedSection = styled.div`
border: 2px solid green;
padding: 0 70px;
@media screen and (max-width: 516px){
    padding: 0 20px;
}
`
const AlsoFollowBar = styled.div`
border: 2px solid red;
@media screen and (max-width: 747px){
    display: none;
}

`
export default Feed