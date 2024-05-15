//STEP: 22 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
//creating inital state
const initialState = {
    token: "",
    user: "",
}
//creating authSlice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        userRegistration: (state, action:PayloadAction<{token:string}>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action:PayloadAction<{accessToken:string, user:string}>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
        }//i think that these are global states by default, will verify later
    }
});
export const {userRegistration,userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;
//OVER: 22("m": ./authApi.ts) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////