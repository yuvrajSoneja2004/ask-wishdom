import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styled from '@emotion/styled';
import {VscFileMedia} from 'react-icons/vsc'
import {AiOutlineEye , AiOutlineEdit} from 'react-icons/ai'
import imageCompression from 'browser-image-compression'
import { axiosInstance } from '../utils/axiosInstance';
import { v4 } from 'uuid';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const [feed , setFeed] = React.useState(null);
  const [caption , setCaption] = React.useState("");


  // Handling seleted file 
  const handleSelectedFile = async (e) => {
    setIsFileSelected(true)
        const file = e.target.files[0];
        const options = {
          maxSizeMB: .1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
      }
     
      let compression = await imageCompression(file, options)
      const reader = new FileReader();
      reader.onload = (event) => {
          setFeed(event.target.result);
      };
      reader.readAsDataURL(compression);
    
    
    
    
      };
    
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // POSTing feed data to db

  const postFeedData = async () => {
    try {
        const fetch  = await axiosInstance.post("/postFeed" , {
            feedID : v4(),
            feedIMG:feed,
            // Continue
            // feedAuthorName : 

        })
    } catch (error) {
        
    }
  }


  React.useEffect(() => {
console.log(feed , "this is feed")
  } , []) 

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       <Cen>
       <DialogTitle style={{fontSize: '17px' , fontWeight: 'bold' , borderBottom: '1px solid black'}}>Create new post</DialogTitle>
       </Cen>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {
            !isFileSelected ?   <SelectFilePart><VscFileMedia size={90} fill='#000'/>
            <h1>Select Picture to Upload</h1>
            <input type="file"  id="feedUpload"  accept="image/*" name='fileUpload' hidden onChange={handleSelectedFile}/>
           <label htmlFor="feedUpload">
          <div>Select from Computer</div>
           </label>
            </SelectFilePart> : (
                <SecondFilePart>
                    <h4> <AiOutlineEye size={20}/> Post image Preview</h4>
                    <div style={{background: `url(${feed})`, backgroundPosition: 'center' , backgroundSize:'cover' , backgroundRepeat: 'no-repeat'}}></div>
                    <h4 style={{marginTop: '10px'}}> <AiOutlineEdit size={20}/> Caption</h4>
                    <textarea name="" id="" cols="30" rows="10" value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>

                    <button onClick={postFeedData}>POST</button>
                </SecondFilePart>
            )
          }
          </DialogContentText>
         
        </DialogContent>
        
      </Dialog>
    </div>
  );
}


const Cen = styled.div`
text-align: center;
`


const SecondFilePart = styled.div`
text-align: center;

h4 {
    font-size: 17px;
    font-weight: bolder;
    color: #000;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 13px;
}

div {
    width: 450px;
    height: 450px;
   
}

textarea {
    width: 100%;
}
`
const SelectFilePart = styled.div`
padding: 40px;
h1 {
    font-size: 30px;
    margin: 30px 0;
    font-weight: bolder;
}

label div {
font-size: 16px;
background-color: #B13634;
color: #fff;
padding: 8px 30px;
border-radius: 5px;

}
text-align: center;
`
