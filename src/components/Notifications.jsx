import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useGlobal } from '../context/global';
import { useAuth0 } from '@auth0/auth0-react';

function Notifications({ show, handleClose }) {
  const { getUserProfileData, getCurrentUserProfileData } = useGlobal();
  const { user } = useAuth0();
  const [isDataRecieved, setIsDataRecieved] = useState(false);

  useEffect(() => {
  
   const isRecieved =  getUserProfileData(user?.email);
   if(isRecieved){
    setIsDataRecieved(true)
   }
    }, []);

    const userData = getCurrentUserProfileData && getCurrentUserProfileData[0];
const userNotifications = userData && userData.userNotifications;

  console.log(userNotifications, 'this not one');
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
       <h1>LOl</h1>
       {
       userNotifications?.map((msg) => {
          return <h1>LOL</h1>
        })
       }
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Notifications;
