import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "./UserContext";

const OldDashboard = () => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <div>
            <h1>Dashboard TEST</h1>
            <div>
                <p>Logged in as: {user?.username}</p>
            </div>
            {user ? 
                <button onClick={logout}>Log out</button> 
            : 
                <button onClick={() => navigate('/login')}>Log in</button>
            }
        </div>
    )
}

export default OldDashboard;