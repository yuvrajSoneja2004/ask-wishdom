import styled from '@emotion/styled'
import React , {useEffect, useState} from 'react'
import FeedCard from '../components/FeedCard'
import 'react-image-crop/dist/ReactCrop.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGlobal } from '../context/global';
import { axiosInstance } from '../utils/axiosInstance';
import FeedLoading from '../components/FeedLoading';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import NoFeedsGIF from '../assets/no-feeds.gif'
import { AnimatePresence, motion } from 'framer-motion';




function Feed() {

    let { user } = useAuth0();
    let { getUserProfileData , getCurrentUserProfileData } = useGlobal();
    const navigate = useNavigate()
    
    const [allFeeds , setAllFeeds] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [isLoadingSuggested , setIsLoadingSuggested] = useState(false);
    const [suggestedProfiles , setSuggestedProfiles] = useState([]);
    const [isPageLoaded , setIsPageLoaded] = useState(false);
    
    
    const getFeeds = async () => {
        setIsLoading(true)
        try {
            const fetchData = await axiosInstance.get("/feeds");
            const res = await fetchData.data;
            console.log(res , "Teri aurrrr :(")
            setAllFeeds(res);
            setIsLoading(false)
            setIsPageLoaded(true)
        } catch (error) {
            console.log("Error at the time of fetching the list of feeds. Error from client side" , error)
            setIsPageLoaded(true)
        }
    }

    const getSuggestedOnes = async () => {
        setIsLoadingSuggested(true);
        try {
            const fetchData = await axiosInstance.get(`/suggestedForYou/${getCurrentUserProfileData[0]?.userID === null ? "" : getCurrentUserProfileData[0]?.userID}`);
            const res = await fetchData.data;
            setSuggestedProfiles(res);
            setIsLoadingSuggested(false);

            
        } catch (error) {
            console.log("error at the time of GET suggested one from client" , error)
        }
    }
    
    useEffect(() => {
        getFeeds();
        getSuggestedOnes();

    } , [])

    if(allFeeds.length === 0 && isPageLoaded){
        return <NoFeeds>
            <img src={NoFeedsGIF} alt="" />
            <h1>No Feeds Uploaded</h1>
        </NoFeeds>
    }


    // feedAuthorName
  return (
   <Divider>
    <AnimatePresence>
   {
    !isLoading ?  <FeedSection>  
    {
     allFeeds.map((feed , i) => {
         return  <FeedCard  key={i} feedData={feed} index={i}/>
     })
    }
 </FeedSection> : <FeedLoading />
   }
   {/* Will do it later  */}
   </AnimatePresence>
    <AlsoFollowBar>
        <h5>Suggested for you</h5>
        {/* Profiles */}
        <AnimatePresence>
       {
       !isLoadingSuggested ? suggestedProfiles?.map((profile ,i) => {
            return  <LinkDiv key={i}
            onClick={() => {navigate(`/getProfile/${profile?.userID}`)}}
            initial={{ opacity: 0 , x:20 }}
            animate={{ opacity: 1 ,x: 0 }}
            exit={{ opacity: 0 , y: 20 }}
            transition={{ duration: .24, delay: i * .24 }}
            >
            <div><img src={profile?.userProfilePic} alt="" /></div><p>{profile?.userProfileName}</p>
         </LinkDiv>
        }) : <Loader />
       }
       </AnimatePresence>
    </AlsoFollowBar>
   </Divider>
  )
}



const Divider = styled(motion.div)`
    display: grid;
    grid-template-columns: 73% auto;
    /* grid-template-columns:  auto; */
    @media screen and (max-width: 747px){
    grid-template-columns: auto;
}
`


const FeedSection = styled.div`
padding: 0 70px;
@media screen and (max-width: 516px){
    padding: 0 20px;
}
`
const AlsoFollowBar = styled.div`
padding: 20px 15px;

h5 {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 20px;
}




div div img {
    height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
}




@media screen and (max-width: 747px){
    display: none;
}

`

const NoFeeds = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;

    h1 {
        font-weight: bolder;
    }
`


const LinkDiv = styled(motion.div)`
display: flex;
margin: 25px 0;
align-items: center;
gap: 10px;
cursor: pointer;
color: #000;
text-decoration: none;
font-weight: bold;

&&:hover {
    color: #000;
}
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
`
export default Feed