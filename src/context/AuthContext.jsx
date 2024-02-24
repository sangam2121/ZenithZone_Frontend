import { createContext } from "react";

export default AuthContext=createContext();

export const AuthProvider=({children})=>{
    return(
        <AuthContext.Provider value="">{children}</AuthContext.Provider>
    )
}