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
    const [handleRender , setHandleRender] = useState(0);
    

    const { user } = useAuth0()



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



// Handle Like Btn
const handleLike = async () => {
    try {
        const { data } =  await axiosInstance.post(`/likeFeed`, {
            currentUserE: user?.email,
            userToLike: feedData?._id
        });

        if(data){
            setHandleRender((prev) => prev + 1);
        }

    } catch (error) {
        console.log(`whwhwhwhwhwhwhwhwhwwh` , error)

    }
}

const handleUnlike = async () => {
    try {
        const resDislike =  await axiosInstance.post(`/dislikeFeed`, {
            currentUserE: user?.email,
            userToUnlike: feedData?._id
        });


        if(resDislike){
            console.log("Dislike man")
            setHandleRender((prev) => prev + 1);
        }
    } catch (error) {
        console.log("ERROR" , error)
    }
}




    useEffect(() => {
        getFeedPostedData();
    } ,[handleRender]) 



    let [ feedLikesArray ] =  feedPostedData;
    // console.log(feedLikesArray , 'the img compoennt');


  return (
    <Card>
        {/* upper row details */}
       <div>
       <ProfilePic to={`/getProfile/${feedData?.feedAuthorProfileID}`}><img src={feedData?.feedAuthorProfilePic} alt="lol" />
        
        
        </ProfilePic>
        <span>{feedData?.feedAuthorName}</span>
        <label>• 99h</label>
       </div>
       {/* the uploaded media details */}
       <UploadedMedia>{isLoading ? <span className="feed-loader"></span> : <img src={feedPostedData[0]?.feedIMG} alt="haha" />}</UploadedMedia>
       {/* Lower row details */}
       <LowerRow>
        <div>
           <section>
           { feedLikesArray?.feedLikesArray.includes(user?.email) ? <AiFillHeart  size={30} onClick={handleUnlike}/> : <AiOutlineHeart size={30} onClick={handleLike}/> }
           <br />
           <span>{feedLikesArray?.feedLikesArray?.length}</span>
           </section>
        </div>
        <div>
           <section>
           <BiBookmark size={30} />
           <br />
           <span>{feedData?.feedLikesArray?.length}</span>
           <h2>{feedData?.feedLikesArray?.length}</h2>
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