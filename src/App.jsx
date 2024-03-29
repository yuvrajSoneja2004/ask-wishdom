import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import NavigationBar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import AskPage from "./pages/AskPage";
import SingleQuestionPage from "./pages/SingleQuestionPage";
import SingleAnswerDefaultQuestion from "./pages/SingleAnswerDefaultQuestion";
import CreateCommunity from "./pages/CreateCommunity";
import Communities from "./pages/Communities";
import SingleCommunityPage from "./pages/SingleCommunityPage";
import CommunityAskPage from "./pages/CommunityAskPage";
import CommunityAnswerSinglePage from "./pages/CommunityAnswerSinglePage";
import SingleAnswerCommunityPage from "./pages/SingleAnswerCommunity";
import MyCommunities from "./pages/MyCommunities";
import Meme from "./pages/Meme";
import MyProfilePage from "./pages/MyProfilePage";
import AllProfiles from "./components/AllProfiles";
import SingleProfilePage from "./pages/SingleProfilePage";
import CommunitiesSidebar from "./components/CommunitiesSidebar";
import styled from "@emotion/styled";
import Feed from "./pages/Feed";
import LoadingBar from "react-top-loading-bar";
import { useGlobal } from "./context/global";
import { useEffect } from "react";
function App() {
  let { isAuthenticated, isLoading } = useAuth0();
  const { loadingProgress, setLoadingProgress, socket } = useGlobal();

  return (
    <div>
      {/* <NavigationBar /> */}
      <LoadingBar color="#B92B27" progress={loadingProgress} height={3} />
      <Balance isAuth={isAuthenticated}>
        {isAuthenticated ? <CommunitiesSidebar /> : null}

        <Routes>
          <Route
            path="/"
            element={!isAuthenticated && !isLoading ? <Register /> : <Home />}
          />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/ask"
            element={
              !isAuthenticated && !isLoading ? <Register /> : <AskPage />
            }
          />
          <Route
            path="/readDefaultQuestion/:questionID"
            element={<SingleQuestionPage />}
          />
          <Route
            path="/answerDefaultQuestion/:questionID"
            element={<SingleAnswerDefaultQuestion />}
          />
          <Route
            path="/answerCommQuestion/:questionID/:index"
            element={<SingleAnswerCommunityPage />}
          />
          <Route path="/createCommunity" element={<CreateCommunity />} />
          <Route path="/communities" element={<Communities />} />
          <Route
            path="/singleCommunityPage/:communityID"
            element={<SingleCommunityPage />}
          />
          <Route
            path="/askCommunityPage/:communityID"
            element={<CommunityAskPage />}
          />
          <Route
            path="/readCommunityQuestion/:communityID/:index/:ed"
            element={<CommunityAnswerSinglePage />}
          />
          <Route path="/userCommunities" element={<MyCommunities />} />
          <Route path="/meme" element={<Meme />} />
          <Route path="/myProfile/:userEmail" element={<MyProfilePage />} />
          <Route path="/allProfiles" element={<AllProfiles />} />
          <Route path="/getProfile/:userID/" element={<SingleProfilePage />} />
        </Routes>
      </Balance>
      <BottomNav />
    </div>
  );
}

const Balance = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.isAuth ? "300px auto" : "auto")};
  /* grid-template-columns: 300px auto; */
  @media screen and (max-width: 1018px) {
    grid-template-columns: auto;
  }
`;

export default App;
