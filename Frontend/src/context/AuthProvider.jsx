import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext=createContext()
export default function AuthProvider({children}){
    // const initialAuthUser = localStorage.getItem("token");
    // const [authUser, setAuthUser] = useState(
    //     initialAuthUser? JSON.parse(initialAuthUser) : undefined
    // )


    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const initialAuthUser = localStorage.getItem("token");
        if (initialAuthUser) {
            setAuthUser(initialAuthUser);
        }
    }, []);


    return(
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext);