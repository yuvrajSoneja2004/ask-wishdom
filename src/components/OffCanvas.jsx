import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Button  from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AiOutlinePicture} from 'react-icons/ai'
import { axiosInstance } from '../utils/axiosInstance';
import { Button as MUIBTN } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react';
import imageCompression from 'browser-image-compression'



function OffCanvasExample({ data , name, ...props }) {
  const [show, setShow] = useState(false);
  const [aboveData , setAboveData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isFilesSelected , setIsFilesSelected] = useState(false);

  const [profilePic, setprofilePic] = useState("")
  const [finalProfileImg , setFinalProfileImg] = useState("");
  // Background Pic States
  const [bgPic, setbgPic] = useState("")
  const [finalBgPic, setFinalBGpic] = useState("")
  const [bgMusic, setBgMusic] = useState("")
  const {user} = useAuth0()

 // ?* Handle Image Compression inputs

  // 1. Profile Pic
  const handleProfilePic = async (e) => {
    console.log("Insdie the picky")
    const file = e.target.files[0];
    const options = {
      maxSizeMB: .1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
  }
  let compression = await imageCompression(file, options)
  const reader = new FileReader();
  reader.onload = (event) => {
      setprofilePic(event.target.result);
  };
  reader.readAsDataURL(compression);

  setFinalProfileImg(compression);


  };

//   // 2. Profile Background Pic
//   const handleBGPic = async (e) => {
//     const file = e.target.files[0];
// console.log("THis works but why")
//     const options = {
//       maxSizeMB: .1,
//       maxWidthOrHeight: 1920,
//       useWebWorker: true,
//   }
//   let compression = await imageCompression(file, options)
//   const reader = new FileReader();
//   reader.onload = (event) => {
//       setbgPic(event.target.result);
//   };
//   reader.readAsDataURL(compression);

//   setFinalBGpic(compression)

//   };


// 2. Profile Background Pic
const handleBGPic = async (e) => {
  const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setbgPic(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

};
// 3. Profile Background Music
const handleBGMusic = async (e) => {
  const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBgMusic(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

};

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Whole>
            <div><img src={data?.userProfilePic} alt="" /></div>
            <h1>{data.userProfileName}</h1>
            <div>
      <Btn onClick={async () => {
        axiosInstance.put(`/changeProfilePic/${user?.email}`, {
            userProfilePic : profilePic
          })
      }}>  <AiOutlinePicture style={{marginRight: '5px'}} size={20} />  Change Profile Pic </Btn>
      <input type="file" name="" id="profileIMG"  accept="image/*" onChange={handleProfilePic} hidden/>
      <label htmlFor="profileIMG">Choose Profile Pic man</label>
      </div>
          </Whole>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function OffCanvasToggle({data}) {
  return (
    <>
      {['hjb'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} data={data}/>
      ))}
    </>
  );
}


const Whole = styled.div`
    display: grid;
    place-items: center;

    div {
        width: 170px;
    }

    img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    h1 {
        font-weight: bolder;
        margin-top: 20px;
    }
`

const Btn = styled(MUIBTN)`
  background-color: #b92b27;
color: #fff;
font-size: 12px;
&&:hover {
    background-color: #b13634;
}
`


export default OffCanvasToggle