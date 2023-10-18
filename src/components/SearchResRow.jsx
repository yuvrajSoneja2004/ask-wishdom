import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

function SearchResRow({ data }) {
  const { userProfilePic, userProfileName, followers, userDesc, userID } = data;
  return (
    <Whole to={`/getProfile/${userID}`}>
      <img src={userProfilePic} alt={userID} />
      <div id="details">
        <strong>{userProfileName}</strong>
        <div>
          <p>
            {userDesc?.slice(0, 30)}
            {userDesc?.length > 30 ? "..." : null}
          </p>
          <label>•</label>
          <label id="followersCount">
            {followers.length}
            {followers?.length >= 1 ? " follower" : " followers"}
          </label>
        </div>
      </div>
    </Whole>
  );
}

const Whole = styled(Link)`
  display: flex;
  align-items: start;
  gap: 8px;
  text-decoration: none;
  color: #000;
  margin: 10px 0;

  &&:hover {
    color: #585858;
  }
  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
  }

  #details p {
    font-weight: 200;
    font-size: 14px;
    color: #828282;
  }

  #details div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  #followersCount {
    font-size: 10px;
  }
`;

export default SearchResRow;
