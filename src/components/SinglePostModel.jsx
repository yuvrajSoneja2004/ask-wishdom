import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import TimeAgo from "../utils/TimeAgo";
import { axiosInstance } from "../utils/axiosInstance";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineSmile,
  AiOutlineWechat,
} from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import CommentRow from "./CommentRow";
import { ToastContainer, toast } from "react-toastify";
import ScrollToBottom from "react-scroll-to-bottom";

function SinglePostModel(props) {
  const {
    postData: {
      feedImg,
      profilePic,
      authorName,
      caption,
      createdAt,
      feedID,
      currentUserPic,
      name,
      profileID,
      commentsArray,
      currentUserDetails,
      reRenderer,
    },
  } = props;

  const [isEmojiPickerVisible, setEmojiPickerVisibility] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [handleRefetch, setHandleRefetch] = useState(0);

  const feedImgDynamicStyles = {
    background: `url(${feedImg})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const postComment = async () => {
    // Data related to comment that will be sent to the server
    const comment_data = {
      feedID: feedID,
      commentInfo: {
        text: commentInput,
        createdAt: new Date(),
        profilePic: currentUserPic,
        name: name,
        profileID: profileID,
        replies: [],
      },
    };
    try {
      if (commentInput.length === 0) {
        alert("Please enter something to comment");
      } else {
        const { data } = await axiosInstance.post("/postComment", comment_data);
        console.log(data, "sucees res");
        if (data.res) {
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
          reRenderer((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFromCommentRow = (data) => {
    setHandleRefetch((prev) => prev + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log(screenWidth);
    };

    window.addEventListener("resize", handleResize);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ToastContainer />
      <Modal.Body>
        <Whole>
          <div id="feedImgDiv" style={feedImgDynamicStyles}></div>
          <div id="detailsDiv">
            <ProfileDetails>
              <section>
                <div id="left">
                  <img src={profilePic} alt="profilePic" />
                </div>
                <div id="right">
                  <strong>{authorName}</strong>
                  <span id="caption">{caption}</span>
                </div>
              </section>

              <TimeAgo
                createdAt={createdAt}
                tagStyles={{ fontWeight: "bold" }}
                endWord={"ago"}
              />
            </ProfileDetails>
            {/* Comments  */}
            <CommentsSection>
              <ScrollToBottom>
                {commentsArray?.map((comment, i) => {
                  return (
                    <span>
                      <CommentRow
                        commentInfo={comment}
                        dataToParent={handleFromCommentRow}
                      />
                    </span>
                  );
                })}
              </ScrollToBottom>
            </CommentsSection>
            {/* Likes section  */}
            <LikesSection>
              <div id="icons">
                <AiOutlineHeart size={27} fill="#000" className="icons" />
                <label htmlFor="comment">
                  <AiOutlineComment size={27} fill="#000" className="icons" />
                </label>
                <AiOutlineShareAlt size={27} fill="#000" className="icons" />
              </div>
              <BiBookmark
                size={26}
                style={{ marginRight: "10px" }}
                fill="#000"
                className="icons"
              />
            </LikesSection>
            {/* Input Section */}
            <InputArea>
              <AiOutlineSmile
                size={27}
                fill="#000"
                onClick={() => setEmojiPickerVisibility(!isEmojiPickerVisible)}
              />
              {isEmojiPickerVisible && (
                <div id="emojiBx">
                  <EmojiPicker
                    theme="dark"
                    onEmojiClick={(event, emojiObject) => {
                      setCommentInput((prev) => `${prev}${event.emoji}`);
                    }}
                  />
                </div>
              )}

              <input
                type="text"
                value={commentInput}
                placeholder="Add a Comment..."
                id="comment"
                onChange={(e) => {
                  setCommentInput(e.target.value);
                }}
              />
              <span onClick={postComment}>Post</span>
            </InputArea>
          </div>
        </Whole>
      </Modal.Body>
    </Modal>
  );
}

const Whole = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  height: 500px;
  * {
    /* outline: 2px solid red; */
  }

  @media screen and (max-width: 791px) {
    flex-direction: column-reverse;
  }

  #feedImgDiv {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 45%;
    height: 100%;
    @media screen and (max-width: 791px) {
      display: none;
    }
  }
  #detailsDiv {
    width: 55%;
    height: 100%;
    @media screen and (max-width: 791px) {
      width: 100%;
    }
  }
`;

const ProfileDetails = styled.div`
  border-bottom: 1px solid #e1e1e1;
  height: 20%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;

  section {
    display: flex;
  }

  #left img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 8px;
    padding: 2px;
    border: 3px solid #b92b27;
  }

  #caption {
    font-size: 12px;
    display: block;
  }
`;

const CommentsSection = styled.div`
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 300px; /* Set the desired height for the comments section */
  overflow-y: scroll;

  padding: 10px;
`;

const LikesSection = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  #icons {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .icons {
    cursor: pointer;
  }
`;

const InputArea = styled.div`
  border-top: 1px solid #e1e1e1;
  display: grid;
  place-items: center;
  grid-template-columns: 5% auto 5%;
  padding: 0 10px;
  height: 50px;
  gap: 10px;
  position: relative;

  input {
    width: 100%;
    outline: none;
    border: none;
  }

  #emojiBx {
    position: absolute;
    bottom: 50px;
    left: 10px;
  }
`;

export default SinglePostModel;
