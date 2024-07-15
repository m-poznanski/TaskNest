import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './Styles/App.css';
import LoginPage from './Pages/LoginPage';
import { UserProvider } from './Contexts/UserContext';
import Dashboard from './Pages/Dashboard';
import TicketDetails from './Pages/TicketDetails';
import TicketAdd from './Pages/TicketAdd';

function App() {
    return (
        <BrowserRouter>
            <UserProvider> 
              <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/ticket/:id' element={<TicketDetails/>}/>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/add' element={<TicketAdd/>}/>
              </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
