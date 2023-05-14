import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let initialState={
    user:"",
    token:"",
    loading:false
}
export const loginUser=createAsyncThunk('user',async(body)=>{
    let res=await fetch("http://127.0.0.1:5000/signin",{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            Authorization:localStorage.getItem('token')
        },
        body:JSON.stringify(body)
    })
    return await res.json();
})
const authSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=localStorage.getItem("token")
        },
        addUser:(state,action)=>{
            state.user=localStorage.getItem("user")
        },
    },
    extraReducers:{
        [loginUser.pending]:(state,action)=>{
            state.loading=true
        },
        [loginUser.fulfilled]:(state,{payload:{user,token}})=>{
            
            state.loading=false
            state.token=token;
            state.user=user
            localStorage.setItem('token',JSON.stringify(token))
            localStorage.setItem('user',JSON.stringify(user))
        },
        [loginUser.rejected]:(state,action)=>{
            state.loading=true
        }, 
    }
})

export const {addToken,addUser}=authSlice.actions;
export default authSlice.reducer;