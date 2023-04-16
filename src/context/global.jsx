import { useReducer } from "react";
import { createContext, useContext } from "react";
import { reducer } from "./reducer";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";


const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {

    let initialState = {
        defaultQuestions: [],
        isError: false,
        isLoading: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    // calling API to get defaultQuestions

    const getDefaultQuestions = async () => {
        dispatch({ type: "API_LOADING" })
        try {
            let fetch = await axiosInstance.get("/getDefaultQuestions");
            let res = await fetch.data;
            console.log(res)
            dispatch({ type: "SET_DEFAULT_QUESTIONS", payload: res })

        } catch (error) {
            dispatch({ type: "SET_DEFAULT_ERROR" })
        }
    }


    useEffect(() => {
        getDefaultQuestions();
    }, [])


    return <GlobalContext.Provider value={{ ...state, getDefaultQuestions }}>{children}</GlobalContext.Provider>
}




export const useGlobal = () => {
    return useContext(GlobalContext)
} 