import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import { UserProvider } from './UserContext';
import Dashboard from './Dashboard';
import TicketDetails from './TicketDetails';

function App() {
    return (
        <BrowserRouter>
            <UserProvider> 
              <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/ticket/:id' element={<TicketDetails/>}/>
                <Route path='/' element={<Dashboard/>}/>
              </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */}

export default App;
