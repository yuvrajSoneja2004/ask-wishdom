import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineSearch, AiOutlineUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import SearchResRow from "./SearchResRow";
import { ProgressBar } from "react-loader-spinner";
import { debounce } from "lodash";
import { useGlobal } from "../context/global";
import { useAuth0 } from "@auth0/auth0-react";

function SearchOffCanvas() {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recentHistory, setRecentHistory] = useState([]);
  const [searchResult, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(undefined);
  const [handleRender, setHandleRender] = useState(0);

  const { getUserProfileData, getCurrentUserProfileData } = useGlobal();
  const { user } = useAuth0();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/search/${searchInput}`);
      setSearchResults(data);

      console.log("hnn re ", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setSearchInput(value);
    debounceSearch(value);
  };
  const debounceSearch = debounce(handleSearch, 3000);

  useEffect(() => {
    const isRecieved = getUserProfileData(user?.email);
  }, []);

  // UserID
  const userData = getCurrentUserProfileData && getCurrentUserProfileData[0];
  const userID = userData && userData.userID;

  const handeHistory = async (searched_user) => {
    try {
      const { data } = await axiosInstance.post("/postHistory", {
        current_user_id: userID,
        history_value: searched_user,
      });
      if (data) {
        console.log(data);
        setHandleRender((prev) => prev + 1);
      }
    } catch (error) {
      console.log("error at the time of handleHistory line 58", error);
    }
  };

  const getHistory = async () => {
    try {
      const { data } = await axiosInstance.get(`/history/${userID}`);
      // To Avoid error if any value found
      // let finalData = data && data[0];
      let [histroyDat] = data;

      setRecentHistory(
        histroyDat === undefined ? "Loading..." : histroyDat?.userHistory
      );
      // console.log("This is godamn recent history");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  });
  return (
    <>
      <PostFeedLink variant="outlined" onClick={handleShow}>
        <AiOutlineSearch size={28} fill="#000" />
        <p>Search</p>
      </PostFeedLink>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>Search</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Whole>
          <input
            type="text"
            className="searchInput"
            placeholder="Search"
            value={searchInput}
            onChange={handleInputChange}
          />
          <hr />
          {!searchResult.length > 0 ? <p>Recent</p> : null}
          {searchResult.length === 0 ? (
            <div className="recentHistory">
              {recentHistory.length === 0 ? (
                <strong>No Recent Searches</strong>
              ) : recentHistory === "Loading..." ? (
                "Loading..."
              ) : (
                recentHistory?.map((his) => {
                  if (his === null || typeof his === "string") return null;
                  return <SearchResRow data={his} />;
                })
              )}
            </div>
          ) : !isLoading ? (
            searchResult.map((res, i) => {
              return (
                <span
                  key={i}
                  onClick={() => {
                    setShow(false);
                    setSearchInput("");
                    setSearchResults([]);
                    handeHistory(res);
                  }}
                >
                  <SearchResRow data={res} />
                </span>
              );
            })
          ) : (
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          )}
        </Whole>
      </Offcanvas>
    </>
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

const Whole = styled(Offcanvas.Body)`
  .searchInput {
    background-color: #efefef;
    border: none;
    outline: none;
    border-radius: 7px;
    width: 100%;
    height: 35px;
    padding: 7px 0 7px 10px;
  }

  .recentHistory {
    /* display: grid; */
    /* place-items: center; */
    /* grid-template-columns: 1fr; */
    /* justify-content: start; */
    /* align-items: start; */
    /* gap: 10px; */
    min-height: 390px;
  }

  p {
    padding: 0 0 10px 0;
  }
`;

export default SearchOffCanvas;
