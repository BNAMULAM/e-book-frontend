
import './App.css';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home';
import Nav from './components/Nav'
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import Logout from './components/Logout';
function App() {
  return (
    
    <div className='App'>
      
      <Router>
   <Nav></Nav>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path='/Register' element={<Register/>}/>
    <Route path="/ResetPassword" element={<ResetPassword/>}/>
    <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
    <Route path="/Logout" element={<Logout/>}/>
   </Routes>
    </Router>
    
    </div>
  );
}

export default App;
