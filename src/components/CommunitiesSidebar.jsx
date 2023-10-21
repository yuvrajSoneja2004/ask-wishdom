import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import SiteIcon from "../assets/sitelogo.png";
import {
  AiFillHome,
  AiOutlineBell,
  AiOutlineCompass,
  AiOutlineGroup,
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineTeam,
  AiOutlineUpload,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useGlobal } from "../context/global";
import UserIcon from "../assets/user.png";
import AlertDialogSlide from "./PostFeedDialogue";
import { Offcanvas } from "react-bootstrap";
import Notifications from "./Notifications";
import SearchOffCanvas from "./Search";

function CommunitiesSidebar() {
  const ICON_SIZE = 25;

  let { logout } = useAuth0();
  let { userCurrentProfileData } = useGlobal();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userProfileInfo = userCurrentProfileData && userCurrentProfileData[0];

  return (
    <>
      <div>
        <Whole>
          <Logo
            src={SiteIcon}
            onClick={() => {
              logout();
            }}
          ></Logo>
          <MenuItems>
            <RouteLink to={"/feed"}>
              <AiOutlineHome size={ICON_SIZE} fill="#000" />
              <p>Home</p>
            </RouteLink>
            <RouteLink to={"/"}>
              <AiOutlineCompass size={ICON_SIZE} fill="#000" />
              <p>Explore Questions</p>
            </RouteLink>
            <RouteLink to={"/ask"}>
              <AiOutlineQuestionCircle size={ICON_SIZE} fill="#000" />
              <p>Ask Question</p>
            </RouteLink>
            <SearchOffCanvas />
            <AlertDialogSlide isInMobile={false} />
            <RouteLink onClick={handleShow}>
              <AiOutlineBell size={ICON_SIZE} fill="#000" />
              <p>Notifications</p>
            </RouteLink>

            <Notifications show={show} handleClose={handleClose} />
            <RouteLink to={"/communities"}>
              <AiOutlineTeam size={ICON_SIZE} fill="#000" />
              <p>Communities</p>
            </RouteLink>
            <RouteLink to={`/myProfile/:userEmail`}>
              <div>
                <img
                  src={
                    userProfileInfo === null || undefined
                      ? UserIcon
                      : userProfileInfo?.userProfilePic || UserIcon
                  }
                  alt=""
                />
              </div>
              <p>Profile</p>
            </RouteLink>
          </MenuItems>
        </Whole>
      </div>
    </>
  );
}

const Logo = styled.img`
  width: 100px;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 3px;
  width: 100%;
`;

const RouteLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 15px 8px;
  width: 100%;
  border-radius: 5px;
  transition: all.3s;

  div {
    width: 40px;
    height: 40px;
    border: 3px solid #b13634;
    border-radius: 50%;
  }

  div img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &&:hover {
    background-color: #d8d8d8;
  }

  p {
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 15px;

    color: #000;
  }
`;

//--------------------------------------

const ComLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const UserCommunities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;

  div img {
    border-radius: 50%;
    height: 45px;
    margin-right: 7px;
    border: 3px solid #b92b27;
    padding: 2px;
  }
`;

const Whole = styled.div`
  width: 250px;
  height: 100vh;
  background: #f1f2f2;
  display: flex;
  justify-content: start;
  position: fixed;
  align-items: start;
  flex-direction: column;
  padding: 30px 20px;
  @media screen and (max-width: 1018px) {
    display: none;
  }
`;

const IconAdd = styled(AddIcon)`
  background: #e6e7e8;
  border-radius: 4px;
  padding: 3px;
`;
const SingleCommunityRows = styled.div`
  margin-top: 30px;

  strong {
    margin-bottom: 20px;
  }
`;
const CreateCommunityBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eceded;
  border-radius: 4px;
  border: none;
  gap: 5px;
  padding: 10px 15px;
`;

export default CommunitiesSidebar;
