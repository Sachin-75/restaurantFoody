import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext=createContext()
export default function AuthProvider({children}){
    // const initialAuthUser = localStorage.getItem("token");
    // const [authUser, setAuthUser] = useState(
    //     initialAuthUser? JSON.parse(initialAuthUser) : undefined
    // )


    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const initialAuthUser = Cookies.get("token");
        if (initialAuthUser) {
            setAuthUser(initialAuthUser);
        } else {
            setAuthUser(null)
        }
    }, []);


    return(
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext);