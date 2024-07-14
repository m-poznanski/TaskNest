import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from './UserContext';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {user, login} = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!username || !password){
        setErrorMessage('Invalid username or password');
        return;
    }

    login({username: username, type: "admin"});
    // Example validation (replace with your backend interaction)
    // if (username !== 'user' || password !== 'password') {
    //   setErrorMessage('Invalid username or password');
    //   return;
    // }
  };

  useEffect(() => {
    if(user){
        navigate('/');
    }
  }, [user])

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