import React, {useEffect, useState,useLayoutEffect} from 'react';
import './style.css';
import axios from "axios";
import {useAuthDispatch} from '../../Context/auth-context';
import {actionTypes} from '../../Context/reduce';

const fetchToken = async (username, password) => {
    return axios.post("http://localhost:3001/login", {
        username: username,
        password: password
    }).then(response => response.data)
}

const fetchCurrentUserInfo = async (token) => {
    return axios.get("http://localhost:3001/users/me", {
        headers: {
            Authorization: token
        }
    }).then(response => response.data);
}

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const dispatch = useAuthDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        fetchToken(username, password)
            .then(({success, data}) => {
                if (success) {
                    setToken(data);
                }
            });
    }

    useLayoutEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setToken(token);
        }
    },[])
    useLayoutEffect(() => {
        if (token) {
            fetchCurrentUserInfo(token)
                .then(({data, success}) => {
                    if (success) {
                        localStorage.setItem('token',token);
                        dispatch({
                                type: actionTypes.LOGIN_SUCCESS,
                                payload: {
                                    user: data,
                                    token: token
                                }
                            });
                    }
                });
        }
    });

    return (<div className="login">
        <h1>Login</h1>
        <form onSubmit={handleLogin} method="post">
            <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username"
                   required="required"/>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password"
                   required="required"/>
            <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
        </form>
    </div>);
}