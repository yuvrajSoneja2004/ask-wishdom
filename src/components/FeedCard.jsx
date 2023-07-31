import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react';
import "./Loader.css";

// Icon Imports 
import {AiFillHeart , AiOutlineHeart ,} from 'react-icons/ai';
import {BiBookmark} from 'react-icons/bi'
import { axiosInstance } from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';



function FeedCard({feedData}) {


    const [feedPostedData , setFeedPostedData]  = useState([]);
    const [isLoading , setIsLoading]  = useState(false);

    const {user} = useAuth0()



    const getFeedPostedData = async () => {
        setIsLoading(true)
        try {
            const fetchData = await axiosInstance.get(`/feedPostedData/${feedData?.feedID}`);
            const res = await fetchData.data;
            console.log(res , "khariat dekho man :(")
            setFeedPostedData(res);
           
        } catch (error) {
            console.log("Error at the time of fetching the list of feeds. Error from client side" , error)
        }
        finally {
            setIsLoading(false)
        }

    }



    // Handling Like and Dislike
// Handle Like Btn
const handleLike = async () => {
    try {

        const fetch = await axiosInstance.post(`/likeFeed`, {
            currentUserE: user?.email,
            userToLike: feedData?.feedAuthorEmail
        });
        let res = await fetch.data;

    } catch (error) {
      // MEANS already following
        console.log(`whwhwhwhwhwhwhwhwhwwh` , error)
        if(error?.response?.data?.isAlreadyFollowing){

        }

    }
}

// Handle Unlike Btn
const handleUnlike = async () => {
  try {
    const fetch = await axiosInstance.post(`/unfollow`, {
      currentUserE: user?.email,
      userToUnfollowE: profileData[0].userEmail
  });
  let res = await fetch.data;
  } catch (error) {
    
  }
}

// Check if Likes/Unliked
const checkifLiked = async () => {
  try {
    let fetch = await axiosInstance.get(`/isAlreadyFollowed/${profileData[0].userEmail}/${user?.email}`);
    let res = fetch.data;
    setIsLoading(false)

  } catch (error) {
    if(error?.response?.data?.isAlreadyFollowing){
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
//   checkIfFollowed()
} )



    useEffect(() => {
        getFeedPostedData();
    } ,[]) 


  return (
    <Card>
        {/* upper row details */}
       <div>
       <ProfilePic to={`/getProfile/${feedData?.feedAuthorProfileID}`}><img src={feedData?.feedAuthorProfilePic} alt="lol" />
        
        
        </ProfilePic>
        <span>{feedData?.feedAuthorName}</span>
        <label>• 2h</label>
       </div>
       {/* the uploaded media details */}
       <UploadedMedia>{isLoading ? <span className="feed-loader"></span> : <img src={feedPostedData[0]?.feedIMG} alt="haha" />}</UploadedMedia>
       {/* Lower row details */}
       <LowerRow>
        <div>
           <section>
           <AiOutlineHeart size={30} onClick={handleLike}/>
           <br />
           <span>{feedData?.feedLikesArray}</span>
           </section>
        </div>
        <div>
           <section>
           <BiBookmark size={30} />
           <br />
           <span>{feedData?.feedLikesArray}</span>
           </section>
        </div>
        
    
       </LowerRow>
        <div>
        <Desc>
       
        <p> <span style={{marginRight: '4px'}}>{feedData?.feedAuthorName}</span>{feedData?.feedCaption}</p>
        </Desc>
        </div>
    </Card>
  )
}




const Desc = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: flex-start;
    p {
        font-size: 14px;
        font-weight: 500;
        margin-left: 3px;
    }
`


const LowerRow = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
        

        section {
            text-align: center;
        }
    }
`

const UploadedMedia = styled.div`
    height: 500px;
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

`

const Card = styled.div`
padding: 10px 0;
div {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
        font-size: 14px;
        font-weight: bolder;
        margin-left: 3px;
    }
    label {
        font-size: 14px;
        margin-left: 2px;
        font-weight: bold;
        color: #8b8b8b;
    }
}

`
const ProfilePic = styled(Link)`
display: flex;
align-items: center;
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;

}

width: 40px;
border-radius: 50%;
height: 40px;

`
export default FeedCard