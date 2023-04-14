import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";


const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {




    return <GlobalContext.Provider value='works man'>{children}</GlobalContext.Provider>
}




export const useGlobal = () => {
    return useContext(GlobalContext)
} 