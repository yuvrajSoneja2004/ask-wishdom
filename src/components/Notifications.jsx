import React, { useEffect } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useGlobal } from '../context/global';
import { useAuth0 } from '@auth0/auth0-react';

function Notifications({show , handleClose}) {


  let {  getUserProfileData , getCurrentUserProfileData } = useGlobal();
  const {user} = useAuth0();
    


  useEffect(() => {
   getUserProfileData(user?.email);
  } , [user?.email]);
  console.log(getCurrentUserProfileData , "notifications")


  return (
    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
     {
      getCurrentUserProfileData[0]?.userNotifications?.map((notification) => {
        return <h1>Got Man</h1>
      })
     }
    </Offcanvas.Body>
  </Offcanvas>
  )
}

export default Notifications