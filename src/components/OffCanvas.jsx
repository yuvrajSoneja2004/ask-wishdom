import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Button  from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AiOutlinePicture , AiFillCamera , AiFillEdit} from 'react-icons/ai'
import {BsFileMusicFill} from 'react-icons/bs'
import {FaEdit} from 'react-icons/fa'
import {BiEditAlt} from 'react-icons/bi'
import { axiosInstance } from '../utils/axiosInstance';
import { Button as MUIBTN } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react';
import imageCompression from 'browser-image-compression'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './Loader.css'


function OffCanvasExample({ data , name, ...props }) {
  const [show, setShow] = useState(false);
  const [aboveData , setAboveData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isFilesSelected , setIsFilesSelected] = useState({
    profilePicSelected: 0,
    backgroundPicSelected: 0,
    backgroundAudioSelected: 0
  });

  const [showRenameUsername , setShowRenameUsername] = useState(false)
  const [showRenameDesc , setShowRenameDesc] = useState(false)
  const [userNameInput , setUserNameInput] = useState("");
  const [userDescInput , setUserDescInput] = useState("");
  const [tookUserInput , setTookUserInput] = useState(false);
  const [tookDescInput , setTookDescInput] = useState(false);
  const [profilePic, setprofilePic] = useState("")
  const [finalProfileImg , setFinalProfileImg] = useState("");
  // Background Pic States
  const [bgPic, setbgPic] = useState("")
  const [finalBgPic, setFinalBGpic] = useState("")
  const [bgMusic, setBgMusic] = useState("")
  const [checkRes,setCheckRes] = useState({});
  const [isLoading , setIsLoading] = useState(false);
  const {user} = useAuth0()

 // ?* Handle Image Compression inputs

  // 1. Profile Pic
  const handleProfilePic = async (e) => {
    const profilePicUpdatedObj = {
      ...isFilesSelected,
      profilePicSelected: 1
    }
    console.log("Insdie the picky")
    const file = e.target.files[0];
    const options = {
      maxSizeMB: .1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
  }
 
  let compression = await imageCompression(file, options)
if(compression){
  profilePicUpdatedObj.profilePicSelected = 2;

}
  const reader = new FileReader();
  reader.onload = (event) => {
      setprofilePic(event.target.result);
  };
  reader.readAsDataURL(compression);

  setFinalProfileImg(compression);
  setIsFilesSelected(profilePicUpdatedObj)


  };




// 2. Profile Background Pic
const handleBGPic = async (e) => {
  const file = e.target.files[0];
    const reader = new FileReader();
    const backgroundPicObj = {
      ...isFilesSelected,
    }

      backgroundPicObj.backgroundPicSelected = 2;
    
    
    reader.onloadend = () => {
      setbgPic(reader.result);
      setIsFilesSelected(backgroundPicObj)
    };

    if (file) {
      reader.readAsDataURL(file);
    }

};
// 3. Profile Background Music
const handleBGMusic = async (e) => {
  const file = e.target.files[0];
    const reader = new FileReader();
    const backgroundMusicObj = {
      ...isFilesSelected,
    }

    backgroundMusicObj.backgroundAudioSelected = 2;

    reader.onloadend = () => {
      setBgMusic(reader.result);
      setIsFilesSelected(backgroundMusicObj);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

};

const checkUserName = async () => {
  setIsLoading(true);
  try {
    let fetch = await axiosInstance.get(`/validateUsername/${userNameInput}`)
            let res = await fetch.data;
            setCheckRes(res);
            setIsLoading(false)
            console.log(res , 'username check')
            

           
  } catch (error) {
    console.log(error , "😃");
  }
}

useEffect(() => {
  if(userNameInput.length != 0){
    setTookUserInput(true)
  }
  else {
    setTookUserInput(false)
  }
} , [userNameInput])


useEffect(() => {
  checkUserName();
  
} , [userNameInput])

  return (
    <>
      <CustomizeBtn variant="primary" onClick={handleShow} className="me-2">
        <AiFillEdit  size={20}/>
        <span>{name}</span>
      </CustomizeBtn>
      <Offcanvas show={show} onHide={handleClose} {...props} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Whole>
            <div><img src={data?.userProfilePic} alt="" /></div>
            <h1>{data?.userProfileName}</h1>
            <div style={{textAlign: 'center'}}>
      
      <input type="file" name="" id="profileIMG"  accept="image/*" onChange={handleProfilePic} hidden/>
      <label htmlFor="profileIMG">
      <UploadHeading>Profile Pic</UploadHeading>
        <UploadFilesBtn>
          <AiFillCamera size={30} style={{margin: '10px 0 '}}/>
          Choose Profile Pic
        </UploadFilesBtn>
      </label>
    {
      isFilesSelected.profilePicSelected === 0 ? null : isFilesSelected.profilePicSelected === 1 ? <span className='uloader'>Loading..</span> : isFilesSelected.profilePicSelected === 2 ? (
        <Btn onClick={async () => {
        try {
        let fetch = await   axiosInstance.put(`/changeProfilePic/${user?.email}`, {
            userProfilePic : profilePic
          })
          let res = fetch.data;
          if(res?.userID?.length != 0){
            toast.success('Successfully Changed Profile Pic 😁', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
             
        } catch (error) {
          toast.error('Failed to change Profile Pic `(*>﹏<*)′', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
            const profilePicUpdatedObj = {
              ...isFilesSelected,
              profilePicSelected: 0
            }
            setIsFilesSelected(profilePicUpdatedObj)
        }}>  <AiOutlinePicture style={{marginRight: '5px'}} size={20} />  Change Profile Pic </Btn>
      ) : "Loading.."
        
       
    }
    {/* For background pic  */}
     <input type="file" name="" id="bgPic"  accept="image/*" onChange={handleBGPic} hidden/>
      <label htmlFor="bgPic">
      <UploadHeading>Background Pic</UploadHeading>
        <UploadFilesBtn style={{fontSize : '13px'}}>
          <AiOutlinePicture size={30}  style={{margin: '10px 0 '}}/>
          Choose Background Pic
        </UploadFilesBtn>
      </label>
    {
      isFilesSelected.backgroundPicSelected === 0 ? null : isFilesSelected.backgroundPicSelected === 1 ? <span className='uloader'>Loading..</span> : isFilesSelected.backgroundPicSelected === 2 ? (
        <Btn onClick={async () => {
        try {
        let fetch = await   axiosInstance.put(`/changeBGPhoto/${user?.email}`, {
          userProfileBG : bgPic
          })
          let res = fetch.data;
          if(res?.userID?.length != 0){
            toast.success('Successfully Changed Background Pic 😁', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
             
        } catch (error) {
          toast.error('Failed to change Background Pic `(*>﹏<*)′', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
            const backgroundPicObj = {
              ...isFilesSelected,
              backgroundPicSelected: 0
            }
            setIsFilesSelected(backgroundPicObj)
        }}>  <AiOutlinePicture style={{marginRight: '5px'}} size={20} />  Change Background Pic </Btn>
      ) : "Loading.."
        
       
    }
     {/* For background music  */}
     <input type="file" name="" id="bgAudio"  accept="audio/*" onChange={handleBGMusic} hidden/>
      <label htmlFor="bgAudio">
      <UploadHeading>Background Music</UploadHeading>
        <UploadFilesBtn style={{fontSize : '13px'}}>
          <BsFileMusicFill size={30} style={{margin: '10px 0 '}}/>
          Choose Background Music
        </UploadFilesBtn>
      </label>
    {
      isFilesSelected.backgroundAudioSelected === 0 ? null : isFilesSelected.backgroundAudioSelected === 1 ? <span className='uloader'>Loading..</span> : isFilesSelected.backgroundAudioSelected === 2 ? (
        <Btn onClick={async () => {
        try {
        let fetch = await   axiosInstance.put(`/changeBgMusic/${user?.email}`, {
          userProfileBGMusic : bgMusic          })
          let res = fetch.data;
          if(res?.userID?.length != 0){
            toast.success('Successfully Changed Background Music 🎸', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
             
        } catch (error) {
          toast.error('Failed to change Background Music `(*>﹏<*)′', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
            const backgroundAudioObj = {
              ...isFilesSelected,
              backgroundAudioSelected: 0
            }
            setIsFilesSelected(backgroundAudioObj)
        }}>  <AiOutlinePicture style={{marginRight: '5px'}} size={20} />  Change Background Music </Btn>
      ) : "Loading.."
        
       
    }
     {/* For updating userName  */}
    
      <label htmlFor="username-up">
      <UploadHeading>Username</UploadHeading>
        <UploadFilesBtn style={{fontSize : '13px'}} onClick={() => setShowRenameUsername(true)}>
          <BiEditAlt size={30}  style={{margin: '10px 0 '}}/>
          Update Username
        </UploadFilesBtn>
      </label>
    <Cen>
    {
        showRenameUsername ? <input  type='text' onChange={ async (e) => {
          try {
            setUserNameInput(e.target.value);
            
          } catch (error) {
            
          }
          
         
        }} value={userNameInput}/> : null
      }
      {
        isLoading && tookUserInput.length != 0 ? <span>Loading...</span> : null
      }
     
      {
        tookUserInput && checkRes?.isAllowedToUpdateName ? <>
         <span>{checkRes?.msg}</span>
        <button onClick={async () => {
          try {
           
            const fetch = await axiosInstance.put(`/updateUsername/${data?.userID}` , {
             userProfileName : userNameInput
            })
            let res = await fetch.data;
            if(res?.isUsernameChanged){
              toast.success('Successfully Updated Username 😁', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
            else {
              toast.error('Failed to change Background Pic `(*>﹏<*)′', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
          } catch (error) {
            console.log("Error updating the username")
          }
        }} >Update</button>

        
        </> : null
      }
      {
        tookUserInput && checkRes?.isAllowedToUpdateName === false ? <>
         <span>{checkRes?.msg}</span>

        
        </> : null
      }
      {/* For desc */}
      <label htmlFor="userdesc-up">
      <UploadHeading>Profile Description</UploadHeading>
        <UploadFilesBtn style={{fontSize : '13px'}} onClick={() => setShowRenameDesc(true)}>
          <FaEdit size={30}  style={{margin: '10px 0 '}}/>
          Update Description
        </UploadFilesBtn>
      </label>
    
    {
        showRenameDesc ? <input  type='text' onChange={ async (e) => {
          try {
            setUserDescInput(e.target.value);
            
          } catch (error) {
            
          }
          
         
        }} value={userDescInput}/> : null
      }
     
      {
        userDescInput.length > 0 ? <>
        <button onClick={async () => {
          try {
           
            const fetch = await axiosInstance.put(`/updateUserDesc/${data?.userID}` , {
              userDesc : userDescInput
            })
            let res = await fetch.data;
            if(res?.isDescChanged){
              toast.success('Successfully Updated Description 😁', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setUserDescInput("")
            }
            else {
              toast.error('Failed to change Description `(*>﹏<*)′', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
          } catch (error) {
            console.log("Error updating the username")
          }
        }} >Update</button>

        
        </> : null
      }
      {
        tookUserInput && checkRes?.isAllowedToUpdateName === false ? <>
         <span>{checkRes?.msg}</span>

        
        </> : null
      }
      {/* For desc */}
      
    
    </Cen>
      </div>
          </Whole>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function OffCanvasToggle({data}) {
  return (
    <>
      {['CUSTOMIZE'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} data={data}/>
       
      ))}
       
    </>
  );
}



const Cen = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-top: 20px;
  }

  span {
    padding: 10px 0;
  }
`

const CustomizeBtn = styled.button`
      background-color: #B13634;
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

  
`


const UploadHeading = styled.h3`
  padding: 14px 0;
  font-size: 18px;
  font-family: 'Rajdhani', sans-serif !important;
`


const UploadFilesBtn = styled.div`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  background-color: #d5d5d582;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 10px;
`

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