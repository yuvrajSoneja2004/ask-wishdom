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

function SearchOffCanvas({ isOnMobile }) {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recentHistory, setRecentHistory] = useState([]);
  const [searchResult, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [handleRender, setHandleRender] = useState(0);

  let { userCurrentProfileData } = useGlobal();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/search/${searchInput}`);
      setSearchResults(data);
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

  // UserID
  const userData = userCurrentProfileData && userCurrentProfileData[0];
  const userID = userData && userData.userID;

  const handeHistory = async (searched_user) => {
    try {
      const { data } = await axiosInstance.post("/postHistory", {
        current_user_id: userID,
        history_value: searched_user,
      });
      if (data) {
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
      let [histroyDat] = data;

      setRecentHistory(
        histroyDat === undefined ? "Loading..." : histroyDat?.userHistory
      );
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
        {!isOnMobile ? (
          <>
            <AiOutlineSearch size={28} fill="#000" />
            <p>Search</p>
          </>
        ) : (
          <div className="searchBar">
            <div>
              <AiOutlineSearch
                style={{ margin: "0 8px 0 4px" }}
                size={20}
                fill="#848484"
              />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        )}
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

  .searchBar {
    text-align: center;
    width: 100%;
    padding: 13px;
    display: none;

    div {
      /* outline: 2px solid; */
      background-color: #efefef;
      width: 100%;
      display: flex;
      align-items: center;
      height: 33px;
      border-radius: 7px;
      padding: 7px 0 7px 7px;
    }

    input {
      border-radius: 7px;
      border: none;
      background-color: transparent;
      width: 100%;
      outline: none;
      font-size: 14px;
      pointer-events: none;
    }
  }
  @media screen and (max-width: 1017px) {
    .searchBar {
      display: block;
      div {
        flex-direction: column;
      }
    }
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
