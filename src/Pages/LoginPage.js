import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../Contexts/UserContext';
import '../Styles/LoginPage.css';
import axios from 'axios';
import { ApiURL } from '../ApiConfig';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {user, login} = useContext(UserContext);
  
  useEffect(() => {
    if(user){
        navigate('/');
    }
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!username || !password){
        setErrorMessage('Username and password required!');
        return;
    }

    logInCall().then((data) => login(data));
    // login({username: username, type: "admin"});
  };

  const logInCall = async () => {
    try {
        const url = ApiURL + 'login';
        const response = await axios.post(url, {Name: username, Password: password, Id: 0, isAdmin: false});
        console.log(response.data);
        // login(response.data);
        return response.data;
      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid username or password');
        //throw error;
      }
  };


  return (
    <div className="login-container">
        <div className="login-card">
            <h1 className="app-name">TaskNest</h1>
            <h3>Log in</h3>
            {errorMessage &&
                <p className="error-message">
                    {errorMessage}
                </p>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-field">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Log In</button>
                <Link to={'/'}>
                    <p className="guest-text">Browse as guest</p>
                </Link>

            </form>
        </div>
    </div>
  );
};

export default LoginPage;