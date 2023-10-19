import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineCompass,
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineTeam,
} from "react-icons/ai";
import AlertDialogSlide from "./PostFeedDialogue";
import Notifications from "./Notifications";
import { useGlobal } from "../context/global";
import UserIcon from "../assets/user.png";
import { useAuth0 } from "@auth0/auth0-react";

function BottomNav() {
  const [show, setShow] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { getUserProfileData, getCurrentUserProfileData } = useGlobal();
  const ICON_SIZE = 25;
  const { user } = useAuth0();

  const handleDataFromChild = (childData) => {
    setNotificationsCount(childData);
  };

  useEffect(() => {
    getUserProfileData(user?.email);
  }, [user?.email]);

  console.log("bottom dv man na ", getCurrentUserProfileData);
  const userNot = getCurrentUserProfileData && getCurrentUserProfileData[0];
  const notificationsCountConst = userNot && userNot.userNotifications;

  return (
    // Will use Map Method
    <Whole>
      <Bx to={"/feed"}>
        <Bubble>
          <IconHome size={ICON_SIZE} fill="#000" />
        </Bubble>
      </Bx>
      <Bx to={"/"}>
        <Bubble>
          <AiOutlineCompass size={ICON_SIZE} fill="#000" />
        </Bubble>
      </Bx>
      <Bx to={"/ask"}>
        <Bubble>
          <AiOutlineQuestionCircle size={ICON_SIZE} fill="#000" />
        </Bubble>
      </Bx>
      <Bx>
        <Bubble>
          <AlertDialogSlide isInMobile={true} />
        </Bubble>
      </Bx>
      <Bx to={"/communities"}>
        <Bubble>
          <AiOutlineTeam size={ICON_SIZE} fill="#000" />
        </Bubble>
      </Bx>
      <Bx>
        <Bubble>
          <span className="notificationsCounter">
            {notificationsCountConst?.length}
          </span>
          <AiOutlineBell onClick={handleShow} size={ICON_SIZE} fill="#000" />
          <Notifications
            show={show}
            handleClose={handleClose}
            handleDataFromChild={handleDataFromChild}
          />
        </Bubble>
      </Bx>
      <Bx to={"/myProfile/:userEmail"}>
        <Bubble>
          <div className="userProfile">
            <img
              src={
                getCurrentUserProfileData === null
                  ? UserIcon
                  : getCurrentUserProfileData[0]?.userProfilePic || UserIcon
              }
              alt=""
            />
          </div>
        </Bubble>
      </Bx>
    </Whole>
  );
}

const Whole = styled.div`
  width: 100%;
  height: 45px;
  display: none;
  background-color: #fff;
  padding-top: 2px;
  border-top: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  overflow: hidden;
  position: fixed;
  bottom: 0;

  @media screen and (max-width: 696px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const Bx = styled(Link)`
  text-decoration: none;
  p {
    font-size: 16px;
  }
`;
const IconHome = styled(AiOutlineHome)`
  font-size: 24px;
`;

const Bubble = styled(IconButton)`
  display: flex;
  flex-direction: column;
  position: relative;

  .notificationsCounter {
    font-size: 9px;
    color: #000;
    border-radius: 50%;
    background-color: #b92b27;
    height: 10px;
    width: 10px;
    display: flex;
    justify-content: center;
    padding: 7.5px;
    align-items: center;
    color: #fff;
    position: absolute;
    left: 20px;
    bottom: 17px;
  }

  .userProfile {
    border: 2px solid #000;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;
export default BottomNav;
