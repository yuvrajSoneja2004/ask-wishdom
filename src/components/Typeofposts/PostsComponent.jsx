import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import FeedCard from "../FeedCard";
import { useGlobal } from "../../context/global";
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { motion } from "framer-motion";

function PostsComponent({ userEmailData }) {
  const [userFeeds, setUserfeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth0();

  const getUserFeeds = async () => {
    setIsLoading(true);
    try {
      const fetchData = await axiosInstance.get(
        `/getUserFeeds/${userEmailData}`
      );
      const res = await fetchData.data;
      console.log(res, "Jo teri sang kaati raatain");
      setUserfeeds(res);
    } catch (error) {
      console.log(
        "error occured at the time of postComponent.jsx from client".error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserFeeds();
  }, [userEmailData]);

  return (
    <Whole>
      {userFeeds.map((feed, i) => {
        console.log(`${i}: `, feed);
        return (
          <div id="gridImg">
            <img src={feed?.feedIMG} alt={feed?.feedID} />
            <HoverDetails>
              <section>
                <AiFillHeart size={22} />
                <strong>{feed?.feedLikesArray.length}</strong>
              </section>
              <section>
                <BsFillChatFill size={19} />
                {/* Yet to be added */}
                <strong>0</strong>
              </section>
            </HoverDetails>
          </div>
        );
      })}
    </Whole>
  );
}

const HoverDetails = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  section {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const Whole = styled.div`
  * {
    box-sizing: border-box;
  }
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0px;

  #gridImg {
    width: 230px;
    height: 230px;
    transition: 0.3s;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    :hover {
      /* filter: brightness(0.5); */

      div {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        transition: all.3s;
      }
    }

    div {
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 5px;
      display: none;
      width: 100px;
      height: 100px;
      transition: all.3s;
    }

    img {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      object-fit: cover;
      display: block;
    }
  }
`;
export default PostsComponent;
