import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useGlobal } from "../context/global";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";

function Notifications({ show, handleClose, handleDataFromChild }) {
  const { userCurrentProfileData, socket, isNotificationsAllowed } =
    useGlobal();
  // Trial Socket Notifications
  const [notificationsList, setNotificationsList] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  const sendDataToParentHandler = () => {
    handleDataFromChild(notificationsList.length);

    // Call the notification method here
    showNotification();
  };

  // Function to show a notification
  const showNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(
            `hi , ${currentNotification?.userProfileName}`,
            {
              body: "This is a sample notification.",
            }
          );
        }
      });
    }
  };

  useEffect(() => {
    socket?.on("recieve_notification", (data) => {
      console.log("Raone", data);
      setNotificationsList((prev) => [...prev, data]);
      setCurrentNotification(data);
      sendDataToParentHandler();
    });
  }, [socket]);

  const userData = userCurrentProfileData && userCurrentProfileData[0];
  const userNotifications = userData && userData.userNotifications;

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <NotificationsWrapper>
          {notificationsList?.length === 0 ? (
            <div id="noNotifications">
              <strong>You have no notifications</strong>
            </div>
          ) : (
            notificationsList?.map((msg, i) => {
              return (
                <NotificationRow key={i}>
                  <img
                    src={msg?.userProfilePic}
                    alt="lol"
                    height={60}
                    width={60}
                  />
                  <p>
                    <strong>{msg?.userProfileName}</strong> liked your post.
                  </p>
                </NotificationRow>
              );
            })
          )}
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

  #noNotifications {
    display: grid;
    place-items: center;
    height: 200px;
  }
`;

export default Notifications;
