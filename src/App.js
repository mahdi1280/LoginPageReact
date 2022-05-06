import React from "react";
import Login from "./Pages/Login";
import Dashbord from "./Pages/Dashbord";
import {useAuthState} from "./Context/auth-context";
export default function App(){
    const {token}=useAuthState();
    return(<>
        {!token ? <Login/> : <Dashbord/>}
    </>);
}