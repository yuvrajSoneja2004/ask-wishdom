import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import { useGlobal } from "../context/global";
import { useEffect } from "react";
import NoDefaultQuestions from "./NoDefaultQuestions";
import { axiosInstance } from "../utils/axiosInstance";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimatePresence } from "framer-motion";
import Error from "./Error";

function QuestionsList() {
  const { defaultQuestions, getDefaultQuestions, setCurrentUserData, isError } =
    useGlobal();
  const [userCheckData, setuserCheckData] = useState([]);

  const { user } = useAuth0();

  const checkUserExistance = async () => {
    let date = new Date();
    try {
      let fetch = user
        ? await axiosInstance.post(`/myProfile/${user.email}`, {
            dateCreated: date.toDateString(),
            followers: [],
            following: [],
            userEmail: user.email,
            userProfilePic: user.picture,
            userProfileName: user.name,
            userID: v4(),
          })
        : "";
      let res = await fetch.data;
      setCurrentUserData(res);
      setuserCheckData(res);
    } catch (error) {
      console.log(" error", error);
    }
  };

  useEffect(() => {
    getDefaultQuestions();
    checkUserExistance();
  }, []);

  return (
    <QuestionsGrid>
      {isError.length != 0 ? (
        <Error code={isError} />
      ) : (
        <AnimatePresence>
          {defaultQuestions?.length === 0 ? (
            <NoDefaultQuestions />
          ) : (
            defaultQuestions?.map((question, i) => {
              return <QuestionCard data={question} key={i} index={i} />;
            })
          )}
        </AnimatePresence>
      )}
    </QuestionsGrid>
  );
}

const QuestionsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 40px;
  margin-bottom: 30px;

  @media screen and (max-width: 1446px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 1049px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 488px) {
    padding: 15px;
    gap: 15px;
  }
`;

export default QuestionsList;
