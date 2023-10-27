import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { MdGridView } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import Audio from "../components/Audio";
import QuestionsAsked from "../components/Typeofposts/QuestionsAsked";
import JoinedCommunities from "../components/Typeofposts/JoinedCommunities";
import { useParams } from "react-router-dom";
import PostsComponent from "../components/Typeofposts/PostsComponent";

// Type of posts components imports

function SingleProfilePage() {
  // * REQUIRED STATE DECLARATIONS
  const [profileData, setprofileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isFollowLoaded, setIsFollowLoaded] = useState(false);
  const [handleReload, setHandleReload] = useState(0);

  const { userID } = useParams();

  // Type of post view handling
  const [typeOfPosts, setTypeOfPosts] = useState(0);
  const { user } = useAuth0();

  const getProfileData = async () => {
    setIsLoading(true);
    try {
      const fetch = await axiosInstance.get(`/getProfileData/${userID}`);
      let res = await fetch.data;
      setprofileData(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error, "On profile page");
    }
  };

  // Handle Follow Btn
  const handleFollow = async () => {
    try {
      const fetch = await axiosInstance.post(`/follow`, {
        currentUserE: user?.email,
        userToFollowE: profileData[0].userEmail,
      });
      let res = await fetch.data;
    } catch (error) {
      // MEANS already following
    }
  };

  // Handle Unfollow
  const handleUnfollow = async () => {
    try {
      const fetch = await axiosInstance.post(`/unfollow`, {
        currentUserE: user?.email,
        userToUnfollowE: profileData[0].userEmail,
      });
      let res = await fetch.data;
    } catch (error) {}
  };

  // Check if followed
  const checkIfFollowed = async () => {
    try {
      let fetch = await axiosInstance.get(
        `/isAlreadyFollowed/${profileData[0].userEmail}/${user?.email}`
      );
      let res = fetch.data;
      // setIsLoading(false)
    } catch (error) {
      if (error?.response?.data?.isAlreadyFollowing) {
        setIsFollowed(true);
        //  setIsLoading(false);
      } else {
        setIsFollowed(false);
        //  setIsLoading(false);
      }
    } finally {
      setIsFollowLoaded(true);
    }
  };

  useEffect(() => {
    checkIfFollowed();
  });

  useEffect(() => {
    setIsFollowed(isFollowed);
  }, [isFollowed]);

  useEffect(() => {
    getProfileData();
  }, [handleReload, userID]);
  document.title = `${
    profileData[0]?.userProfileName === undefined
      ? "Loading..."
      : profileData[0]?.userProfileName
  } • Ask-Wishdom`;

  return !isLoading ? (
    <MAX
      style={{
        backgroundImage: `url(${profileData[0]?.userProfileBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isFollowLoaded ? (
        <Whole>
          <Audio path={profileData[0]?.userProfileBGMusic} />

          <ProfileIMG
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          >
            <img src={profileData[0]?.userProfilePic} alt="" />
          </ProfileIMG>
          <UssrName>{profileData[0]?.userProfileName}</UssrName>

          <ProfileStats>
            <div>
              <h5>{profileData[0]?.following.length}</h5>
              <h4>Following</h4>
            </div>
            <div>
              <h5>{profileData[0]?.followers.length}</h5>
              <h4>Followers</h4>
            </div>
            <div>
              <h5>0</h5>
              <h4>All Posts</h4>
            </div>
          </ProfileStats>
          <Desc>{profileData[0]?.userDesc}</Desc>
          <CustomizeHeading>
            {/* Follow btn here  */}
            {!isFollowed ? (
              isFollowLoaded ? (
                <FollowBtn onClick={handleFollow}>FOLLOW</FollowBtn>
              ) : (
                "Loading..."
              )
            ) : isFollowLoaded ? (
              <FollowBtn onClick={handleUnfollow}>UNFOLLOW</FollowBtn>
            ) : (
              "Loading..."
            )}
          </CustomizeHeading>

          <div
            style={{
              width: "100%",
              height: "1px",
              border: "1px solid #b8b8b8",
            }}
          ></div>

          <UserPostsSet>
            <div onClick={() => setTypeOfPosts(0)}>
              {" "}
              <MdGridView size={20} /> <span>POSTS</span>
            </div>
            <div onClick={() => setTypeOfPosts(1)}>
              {" "}
              <BsQuestionCircle size={20} /> <span>QUESTIONS ASKED</span>
            </div>
            <div onClick={() => setTypeOfPosts(2)}>
              {" "}
              <FiUserCheck size={20} /> <span>CREATED COMMUNITIES</span>
            </div>
          </UserPostsSet>
          <PostsContectArea>
            {/* Change type of content data here */}
            {typeOfPosts === 0 ? (
              <PostsComponent userEmailData={profileData[0]?.userEmail} />
            ) : typeOfPosts === 1 ? (
              <QuestionsAsked userEmailData={profileData[0]?.userEmail} />
            ) : typeOfPosts === 2 ? (
              <JoinedCommunities userEmailData={profileData[0]?.userEmail} />
            ) : (
              "nope"
            )}
          </PostsContectArea>
        </Whole>
      ) : (
        "Laoding"
      )}
    </MAX>
  ) : (
    "Loading..."
  );
}

const FollowBtn = styled.button`
  background-color: #b13634;
  border: none;
  outline: none;
  padding: 10px 20px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  display: flex;
  align-items: center;
  transition: all.4s;

  &&:hover {
    background-color: #882625;
  }

  span {
    margin-left: 6px;
  }
`;

const PostsContectArea = styled.div`
  width: 100%;
`;

const UserPostsSet = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 12px;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;

    span {
      margin-left: 4px;
    }
  }
`;
const Desc = styled.p`
  padding: 30px 0;
  text-align: center;
  line-height: 27px;
  font-weight: 500;
  letter-spacing: 1px;
  width: 500px;
`;

const UssrName = styled.h1`
  font-weight: bolder;
  margin-top: 10px;
  letter-spacing: 1px;
  text-shadow: 0px 1px, 1px 0px, 1px 1px;
  margin-bottom: 20px;
`;

const CustomizeHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  text-align: center;
  width: 100%;
  div {
    width: 50%;
    height: 3px;
    border-bottom: 4px double black;
  }
  h2 {
    font-family: "Lumanosimo", cursive !important;
  }
`;

const MAX = styled.div`
  min-height: 100vh;
  padding: 0 100px;
  width: 100%;
`;

const Whole = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileIMG = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 30px;
  border-radius: 50%;
  border: 5px solid #b13634;
  /* padding: 10px; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileStats = styled.div`
  div {
    text-align: center;
  }
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  h4 {
    font-weight: bolder;
    text-transform: uppercase;
    font-size: 20px;
    color: #b13634;
  }
  h5 {
    font-weight: bolder;
    text-shadow: 0px 1px, 1px 0px, 1px 1px;
  }
`;
const Btn = styled(Button)`
  background-color: #b92b27;
  color: #fff;
  &&:hover {
    background-color: #b13634;
  }
`;

const Btns = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 13px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
export default SingleProfilePage;
