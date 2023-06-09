import { useReducer } from "react";
import { createContext, useContext } from "react";
import { reducer } from "./reducer";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";




const GlobalContext = createContext();




export const GlobalProvider = ({ children }) => {

    let alo = useAuth0();

    let initialState = {
        defaultQuestions: [],
        isError: false,
        isLoading: false,
        communtiyValidationData: {},
        allCommunities: [],
        allCommunitiesLoading: true
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    // calling API to get defaultQuestions

    const getDefaultQuestions = async () => {
        dispatch({ type: "API_LOADING" })
        try {
            let fetch = await axiosInstance.get("/getDefaultQuestions");
            let res = await fetch.data;
            dispatch({ type: "SET_DEFAULT_QUESTIONS", payload: res })

        } catch (error) {
            dispatch({ type: "SET_DEFAULT_ERROR" })
        }
    }

    const communityValidation = async (input) => {
        dispatch({ type: "API_LOADING" });
        try {
            let fetch = await axiosInstance.get(`/validateCommunityName/${input}`)
            let res = fetch.data;
            dispatch({ type: "SET_COMMUNITY_VALIDATION", payload: res })
        } catch (error) {
            console.log(`community name validation error from client side : cause `, error)
        }
    }

    // fetch communities
    const getCommunities = async () => {
        try {
            let fetch = await axiosInstance.get("/getCommunities");
            let res = await fetch.data;
            dispatch({ type: "GET_COMMUNITIES", payload: res })
        } catch (error) {
            console.log("WHY", error)
        }
    }

    useEffect(() => {
        getDefaultQuestions();
    }, [])


    return <GlobalContext.Provider value={{ ...state, getDefaultQuestions, communityValidation, dispatch, getCommunities }}>{children}</GlobalContext.Provider>
}




export const useGlobal = () => {
    return useContext(GlobalContext)
} 