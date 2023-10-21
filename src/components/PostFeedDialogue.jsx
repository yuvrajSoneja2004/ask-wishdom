import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import styled from "@emotion/styled";
import { VscFileMedia } from "react-icons/vsc";
import { AiOutlineEye, AiOutlineEdit, AiOutlineUpload } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import { axiosInstance } from "../utils/axiosInstance";
import { v4 } from "uuid";
import { useGlobal } from "../context/global";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ isInMobile }) {
  const [open, setOpen] = React.useState(false);
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const [feed, setFeed] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  let { user } = useAuth0();
  let { userCurrentProfileData } = useGlobal();
  // Create a ref to the input element
  const fileInputRef = React.useRef(null);

  // Function to trigger the file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handling seleted file
  const handleSelectedFile = async (e) => {
    setIsFileSelected(true);
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    let compression = await imageCompression(file, options);
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

  const userData = userCurrentProfileData && userCurrentProfileData[0];

  // POSTing feed data to db

  const postFeedData = async () => {
    try {
      const fetch = await axiosInstance.post("/postFeed", {
        feedID: v4(),
        feedIMG: feed,
        feedAuthorName: userData?.userProfileName,
        feedAuthorProfilePic: userData?.userProfilePic,
        feedCaption: caption.length === 0 ? "I Love Ask-Wishdom! 😁" : caption,
        feedAuthorProfileID: userData?.userID,
        feedAuthorEmail: user?.email,
      });

      let res = await fetch.data;
      if (res) {
        toast.success("Posted Sucessfully 🤩", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to Post 😣", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(true);
    }
  };

  return (
    <div>
      <PostFeedLink
        variant="outlined"
        onClick={handleClickOpen}
        isOnMobile={isInMobile}
      >
        <AiOutlineUpload size={25} fill="#000" />
        {!isInMobile ? <p>Post Feed</p> : null}
      </PostFeedLink>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Cen>
          <DialogTitle
            style={{
              fontSize: "17px",
              fontWeight: "bold",
              borderBottom: "1px solid black",
            }}
          >
            Create new post
          </DialogTitle>
        </Cen>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {!isFileSelected ? (
              <SelectFilePart>
                <VscFileMedia size={90} fill="#000" />
                <h1>Select Picture to Upload</h1>
                <input
                  type="file"
                  id="feedUpload"
                  accept="image/*"
                  name="fileUpload"
                  hidden
                  ref={fileInputRef}
                  onChange={handleSelectedFile}
                />
                <div style={{ zIndex: "-1" }} onClick={handleButtonClick}>
                  Select from Computer
                </div>
              </SelectFilePart>
            ) : (
              <SecondFilePart>
                <h4>
                  {" "}
                  <AiOutlineEye size={20} /> Post image Preview
                </h4>
                <div>
                  <img src={feed} alt="ll" />
                </div>
                <h4 style={{ marginTop: "10px" }}>
                  {" "}
                  <AiOutlineEdit size={20} /> Caption
                </h4>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>

                <button onClick={postFeedData}>POST</button>
              </SecondFilePart>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
    </div>
  );
}

const PostFeedLink = styled(Link)`
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  // Sussy Imposter
  padding: ${(props) => (!props.isOnMobile ? "15px 8px" : "0px")};
  width: 100%;

  &&:hover {
    background-color: #d8d8d8;
    color: #000;
  }
`;

const Cen = styled.div`
  text-align: center;
`;

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

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  div {
    width: 450px;
    height: 450px;
    background-color: #000;
  }

  textarea {
    width: 100%;
  }
`;
const SelectFilePart = styled.div`
  padding: 40px;
  h1 {
    font-size: 30px;
    margin: 30px 0;
    font-weight: bolder;
  }

  label div {
    font-size: 16px;
    background-color: #b13634;
    color: #fff;
    padding: 8px 30px;
    border-radius: 5px;
  }
  text-align: center;
`;
