import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import "./Loader.css";
// Icon Imports
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBookmark, BiLoader } from "react-icons/bi";
import { axiosInstance } from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobal } from "../context/global";
import TimeAgo from "../utils/TimeAgo";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import SinglePostModel from "./SinglePostModel";

function FeedCard({ feedData, index }) {
  const { socket, userCurrentProfileData } = useGlobal();
  const [feedPostedData, setFeedPostedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [handleRender, setHandleRender] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const { user } = useAuth0();

  const animateDuration = 0.23;
  const userProfileInfo = userCurrentProfileData && userCurrentProfileData[0];

  const getFeedPostedData = async () => {
    setIsLoading(true);
    try {
      const fetchData = await axiosInstance.get(
        `/feedPostedData/${feedData?.feedID}`
      );
      const res = await fetchData.data;
      setFeedPostedData(res);
    } catch (error) {
      console.log(
        "Error at the time of fetching the list of feeds. Error from client side",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const userSecondID = userProfileInfo && userProfileInfo.userID;
  const feedImg = feedPostedData && feedPostedData[0];
  const feedComments = feedImg && feedImg.feedComments;
  const finalImg = feedImg && feedImg.feedIMG;

  let userDetailsToBePushed = {
    user_name: userProfileInfo?.userProfileName,
    user_profile_pic: userProfileInfo?.userProfilePic,
    user_id: userProfileInfo?._id,
    the_post: finalImg,
  };

  // Handle Like Btn
  const handleLike = async () => {
    setIsLikeLoading(true);
    try {
      const { data } = await axiosInstance.post(`/likeFeed`, {
        currentUserE: user?.email,
        userToLike: feedData?._id,
      });

      if (data) {
        setIsLikeLoading(false);
        socket?.emit("request_user_notifications", {
          user_that_liked: userDetailsToBePushed,
          user_that_got_liked_id: feedData,
        });

        setHandleRender((prev) => prev + 1);
      }
    } catch (error) {
      console.log(`whwhwhwhwhwhwhwhwhwwh`, error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleUnlike = async () => {
    setIsLikeLoading(true);
    try {
      const resDislike = await axiosInstance.post(`/dislikeFeed`, {
        currentUserE: user?.email,
        userToUnlike: feedData?._id,
      });

      if (resDislike) {
        setIsLikeLoading(false);
        setHandleRender((prev) => prev + 1);
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleCommentsRender = (data) => {
    setHandleRender((prev) => prev + 1);
  };

  useEffect(() => {
    getFeedPostedData();
  }, [handleRender]);

  let [feedLikesArray] = feedPostedData;

  return (
    <Card
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: animateDuration, delay: index * animateDuration }}
    >
      <SinglePostModel
        show={showModel}
        onHide={() => {
          setShowModel(false);
        }}
        postData={{
          reRenderer: setHandleRender,
          feedID: feedData?.feedID,
          authorName: feedData?.feedAuthorName,
          profilePic: feedData?.feedAuthorProfilePic,
          feedImg: feedPostedData[0]?.feedIMG,
          caption: feedData?.feedCaption,
          createdAt: feedData?.createdAt,
          currentUserPic: userProfileInfo?.userProfilePic,
          name: userDetailsToBePushed.user_name,
          profileID: userSecondID,
          commentsArray: feedComments,
        }}
      />
      {/* upper row details */}
      <div>
        <ProfilePic to={`/getProfile/${feedData?.feedAuthorProfileID}`}>
          <img src={feedData?.feedAuthorProfilePic} alt="lol" />
        </ProfilePic>
        <span>{feedData?.feedAuthorName}</span>
        <TimeAgo createdAt={feedData?.createdAt} />
      </div>
      {/* the uploaded media details */}
      <UploadedMedia onClick={() => setShowModel(true)}>
        {isLoading ? (
          <span className="feed-loader"></span>
        ) : (
          <img src={feedPostedData[0]?.feedIMG} alt="haha" />
        )}
      </UploadedMedia>
      {/* Lower row details */}
      <LowerRow>
        <div>
          <section>
            {feedLikesArray?.feedLikesArray.includes(user?.email) ? (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <AiFillHeart size={30} onClick={handleUnlike} />
                <span>{feedLikesArray?.feedLikesArray?.length}</span>
              </motion.div>
            ) : isLikeLoading ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                exit={{ scale: 0 }}
              >
                <Spinner size="sm" />
              </motion.span>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <AiOutlineHeart size={30} onClick={handleLike} />
                <span>{feedLikesArray?.feedLikesArray?.length}</span>
              </motion.div>
            )}
            <br />
          </section>
        </div>
        <div>
          <section>
            <BiBookmark size={30} />
            <br />
            <span>{feedData?.feedLikesArray?.length}</span>
          </section>
        </div>
      </LowerRow>
      <div>
        <Desc>
          <p>
            {" "}
            <span style={{ marginRight: "4px" }}>
              {feedData?.feedAuthorName}
            </span>
            {feedData?.feedCaption}
          </p>
        </Desc>
      </div>
    </Card>
  );
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
`;

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
`;

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
`;

const Card = styled(motion.div)`
  padding: 10px 0;
  cursor: pointer;
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
`;
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
`;
export default FeedCard;
