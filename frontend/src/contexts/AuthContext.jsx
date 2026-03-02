import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ACCCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}){
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //getting access token on first load
    useEffect(() =>{
        const access = localStorage.getItem(ACCCESS_TOKEN);

        if(!access){
            setIsAuthenticated(false);
            return;
        }
        checkAuth(access)
    },[]);

    const checkAuth = (access) =>{
        try{
            const decode = jwtDecode(access);
            const now = Date.now()/1000;

            if(decode.exp < now){
                setIsAuthenticated(false);
                logout();
            }else{
                console.log("Token still valid");
                setToken(access);
                setIsAuthenticated(true);
                setUser({ id: decode.id, username: decode.username, email: decode.email });

            }
        }catch(err){
            console.log(err);
            logout();
        }
    }
    //login function
    const login = (access) =>{
        localStorage.setItem(ACCCESS_TOKEN,access);
        setToken(access);
        setIsAuthenticated(true);
        const decode = jwtDecode(access);
        setUser({ id: decode.id, username: decode.username, email: decode.email });

    }
    //logout
    const logout = () =>{
        localStorage.removeItem(ACCCESS_TOKEN);
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    const value = {
        token,
        isAuthenticated,
        user,
        setUser,
        login,
        logout
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}
