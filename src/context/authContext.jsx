import { createContext, useContext, useReducer } from "react";

const initialState = {
    userId: null,
    userName: null,
    userImg: null
}

const AuthContext = createContext();

const authReducer = (state, action) => {
    if (action.type === "LOGIN") {
        return {
            ...state,
            userId: action.payload.userId,
            userName: action.payload.userName,
            userImg: action.payload.userImg,
        }
    }
    return state;
}
const AuthProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,initialState)
    return(
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    else{
        return context;
    }
}

export{AuthProvider,useAuth}