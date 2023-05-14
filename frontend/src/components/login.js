import React, { useState } from "react";
import './login.css'
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import axios from "axios";
const Login =()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch = useDispatch()
    const handleLogin=()=>{
     dispatch(loginUser({email,password}))
    }
    const handleGoogleLogin=()=>{
    window.open(
        `http://127.0.0.1:5000/auth/google`,
        "_self"
    );
    }
return(
    
    <div className="loginForm login">
        <input type='email' placeholder="Email"value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type='password' placeholder="Password"value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button type="submit" onClick={()=>handleLogin()} className="submitbtn">Login</button>
        <button onClick={(e)=>{
            handleGoogleLogin()
        }}>Login with google</button>
    </div>
)
}
export default Login