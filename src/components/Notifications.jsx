import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useGlobal } from "../context/global";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
function Notifications({ show, handleClose, handleDataFromChild }) {
  const { userCurrentProfileData, socket, isNotificationsAllowed } =
    useGlobal();
  const [notificationsList, setNotificationsList] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  const sendDataToParentHandler = () => {
    handleDataFromChild(notificationsList.length);
  };

  useEffect(() => {
    socket?.on("show_notification", (data) => {
      console.log(data, "this is the socket data");
      setNotificationsList((prev) => [...prev, data]);
      setCurrentNotification(data);
      sendDataToParentHandler();
    });
  }, []);

  useEffect(() => {
    if (isNotificationsAllowed) {
      new Notification("Ask-Wishdom", {
        body: `${currentNotification?.user_name} Liked your post`,
        icon: currentNotification?.user_profile_pic,
      });
    }
  }, [notificationsList]);

  const userData = userCurrentProfileData && userCurrentProfileData[0];
  const userNotifications = userData && userData.userNotifications;

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <NotificationsWrapper>
          {[...new Set(userNotifications)]?.map((msg, i) => {
            return (
              <NotificationRow key={i}>
                <img
                  src={msg?.user_profile_pic}
                  alt="lol"
                  height={60}
                  width={60}
                />
                <p>
                  <strong>{msg?.user_name}</strong> liked your post.
                </p>
                {/* <img src={msg?.the_post} alt="" height={100} width={100} /> */}
              </NotificationRow>
            );
          })}
        </NotificationsWrapper>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

const NotificationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Notifications;
