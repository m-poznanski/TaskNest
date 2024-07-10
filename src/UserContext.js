import React, {createContext, useState, useMemo} from 'react';
import {useNavigate} from "react-router-dom";
import useLocalStorage from './useLocalStorage';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

  // ... functions to update user state based on login/logout
    const login = async (data) => {
        setUser(data);
        navigate("/");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(() => ({
          user,
          login,
          logout,
        }),
        [user]
    );

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};