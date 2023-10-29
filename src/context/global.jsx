import { useReducer, useState } from "react";
import { createContext, useContext } from "react";
import { reducer } from "./reducer";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import socket_io_client from "socket.io-client";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  let initialState = {
    defaultQuestions: [],
    isError: [],
    isLoading: false,
    communtiyValidationData: {},
    allCommunities: [],
    allCommunitiesLoading: true,
    userCurrentProfileData: {},
  };

  const { user } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [getCurrentUserProfileData, setCurrentUserProfileData] = useState(null);
  const [socket, setSocket] = useState(undefined);
  const [handleFeedLikeRenderer, setHandleFeedLikeRenderer] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // calling API to get defaultQuestions
  const getDefaultQuestions = async () => {
    dispatch({ type: "API_LOADING" });
    setLoadingProgress(34);
    try {
      let fetch = await axiosInstance.get("/getDefaultQuestions");
      let res = await fetch.data;
      dispatch({ type: "SET_DEFAULT_QUESTIONS", payload: res });
    } catch (error) {
      dispatch({ type: "SET_DEFAULT_ERROR", payload: error });
    } finally {
      setLoadingProgress(100);
    }
  };

  const communityValidation = async (input) => {
    dispatch({ type: "API_LOADING" });

    try {
      let fetch = await axiosInstance.get(`/validateCommunityName/${input}`);
      let res = fetch.data;
      dispatch({ type: "SET_COMMUNITY_VALIDATION", payload: res });
    } catch (error) {
      console.log(
        `community name validation error from client side : cause `,
        error
      );
    }
  };

  // fetch communities
  const getCommunities = async () => {
    setLoadingProgress(34);
    try {
      let fetch = await axiosInstance.get("/getCommunities");
      let res = await fetch.data;
      dispatch({ type: "GET_COMMUNITIES", payload: res });
    } catch (error) {
      console.log("WHY", error);
    } finally {
      setLoadingProgress(100);
    }
  };
  // UserProfile Data
  const getUserProfileData = async () => {
    setLoadingProgress(34);
    try {
      let fetch = await axiosInstance.get(
        `getSpecificProfileData/${user?.email}`
      );
      let res = await fetch.data;
      dispatch({ type: "CURRENT_USER_PROFILE_DATA", payload: res });
      return res;
    } catch (error) {
      console.log("userProfileCLientError", error);
      if (error.code == "ERR_NETWORK") {
        dispatch({ type: "SET_DEFAULT_ERROR", payload: error.message });
      }
    } finally {
      setLoadingProgress(100);
    }
  };

  // Handle Like Btn
  const handleLike = async (userToLike_id, userDetailsToBePushed, feedData) => {
    setIsLikeLoading(true);
    try {
      const { data } = await axiosInstance.post(`/likeFeed`, {
        currentUserE: user?.email,
        userToLike: userToLike_id,
      });

      console.log("chitti ", feedData?.feedAuthorName);

      // Send Notification
      socket?.emit("send_notifications", {
        current_user:
          state.userCurrentProfileData && state.userCurrentProfileData[0],
        user_that_got_liked: feedData?.feedAuthorName,
      });

      if (data) {
        setHandleFeedLikeRenderer((prev) => prev + 1);
        socket?.emit("request_user_notifications", {
          user_that_liked: userDetailsToBePushed,
          user_that_got_liked_id: feedData,
        });
      }
    } catch (error) {
      console.log(`whwhwhwhwhwhwhwhwhwwh`, error);
      setHandleFeedLikeRenderer((prev) => prev + 1);
    } finally {
      isLikeLoading(false);
    }
  };
  // Handle Dislike
  const handleUnlike = async (userToUnlike_id) => {
    try {
      const resDislike = await axiosInstance.post(`/dislikeFeed`, {
        currentUserE: user?.email,
        userToUnlike: userToUnlike_id,
      });

      if (resDislike) {
        setHandleFeedLikeRenderer((prev) => prev + 1);
        // setHandleRender((prev) => prev + 1);
      }
    } catch (error) {
      setHandleFeedLikeRenderer((prev) => prev + 1);
      console.log("ERROR", error);
    } finally {
      // setIsLikeLoading(false);
    }
  };

  const [currentUserData, setCurrentUserData] = useState([]);
  const [isNotificationsAllowed, setIsNotificationsAllowed] =
    useState(undefined);

  useEffect(() => {
    Notification.requestPermission()
      .then((res) => {
        if (res == "granted") {
          setIsNotificationsAllowed(true);
        } else {
          setIsNotificationsAllowed(false);
        }
      })
      .catch((err) => {
        alert(err);
      });

    getDefaultQuestions();
    // Socket Connection
    const socket = socket_io_client.connect(
      "https://ask-wishdom-server.onrender.com/",
      {
        transports: ["websocket", "polling", "flashsocket"],
      }
    );
    setSocket(socket);
  }, []);

  useEffect(() => {
    getUserProfileData(user?.email);
  }, [user?.email]);

  useEffect(() => {
    socket?.emit(
      "add_online_user",
      state.userCurrentProfileData && state.userCurrentProfileData[0]
    );
  }, [socket, state]);


  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getDefaultQuestions,
        communityValidation,
        dispatch,
        getCommunities,
        getCurrentUserProfileData,
        getUserProfileData,
        setCurrentUserData,
        socket,
        isNotificationsAllowed,
        handleLike,
        handleUnlike,
        handleFeedLikeRenderer,
        setHandleFeedLikeRenderer,
        isLikeLoading,
        loadingProgress,
        setLoadingProgress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobal = () => {
  return useContext(GlobalContext);
};
