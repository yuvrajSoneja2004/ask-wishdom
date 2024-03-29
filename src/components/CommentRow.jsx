import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import TimeAgo from "../utils/TimeAgo";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuth0 } from "@auth0/auth0-react";

function CommentRow({ commentInfo, dataToParent, feedID, allComments }) {
  console.log("Honet", allComments);
  const {
    text,
    createdAt,
    profilePic,
    name,
    profileID,
    replies,
    type,
    currentUserData,
    commentID,
  } = commentInfo;

  const { user } = useAuth0();
  console.log("User", commentInfo);

  const handleCommentLike = async () => {
    try {
      const { data } = await axiosInstance.post("/likeComment", {
        userThatLiked: user.email,
        feedID: feedID,
        commentID: commentID,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Whole>
      <div id="info">
        <LinkContainer to={`/getProfile/${profileID}`}>
          <img src={profilePic} alt="pic_img" width={30} height={30} />
        </LinkContainer>
        <div id="textInfo">
          <LinkContainer to={`/getProfile/${profileID}`}>
            <strong>{name}</strong>
            <strong>{type}</strong>
          </LinkContainer>
          <span>{text}</span>
          <div id="timePassed">
            <span>
              <TimeAgo createdAt={createdAt} />
            </span>
            <strong>{commentInfo?.likes?.length} Likes</strong>
          </div>
        </div>
      </div>
      {allComments?.includes(user?.email) ? (
        <AiFillHeart size={15} onClick={handleCommentLike} />
      ) : (
        <AiOutlineHeart size={15} onClick={handleCommentLike} />
      )}
    </Whole>
  );
}


const Whole = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  #info {
    display: flex;
    img {
      border-radius: 50%;
    }
  }

  #textInfo {
    strong,
    span {
      font-size: 14px;
    }

    strong {
      margin-left: 10px;
      margin-right: 5px;
    }

    #timePassed {
      margin-left: 10px;
      display: flex;
      align-items: center;
      gap: 2px;
      margin-top: 5px;

      span,
      strong {
        font-size: 12px;
        color: #898989;
      }
    }
  }
`;

const LinkContainer = styled(Link)`
  text-decoration: none;
  color: #000;
  transition: all.2s;

  :hover {
    color: #b92b27;
  }
`;

const Replies = styled.div`
  width: 400px;
  background-color: pink;
  min-height: 100px;
`;
export default CommentRow;
