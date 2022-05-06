import React,{useState} from 'react';
import './style.css';
import axios from "axios";

const fetchToken= async (username,password)=>{
    return axios.post("http://localhost:3001/login",{
        username:username,
        password:password
    })
}

export default function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = (e)=>{
        e.preventDefault();
        fetchToken(username,password)
            .then(console.log);
    }

    return ( <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleLogin} method="post">
            <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder="Username" required="required" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
        </form>
    </div>);
}