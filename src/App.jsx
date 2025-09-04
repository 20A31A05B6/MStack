import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Ct from './components/Ct';
import Cookies from 'js-cookie';

import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Nav from './components/Nav';
import Admin from './components/Admin';
import Edit from './components/Edit';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import Home from './components/Home';

const App = () => {
  const [state, setState] = useState({ token: "", uid: "", name: "", role: "" });
  const updstate = (obj) => {
    setState({ ...state, ...obj });
  };

  useEffect(() => {
    const t = Cookies.get("lgc");
    if (t !== undefined) {
      updstate(JSON.parse(t));
    }
  }, []);

  const obj = { state, updstate };

  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/edit/:pid" element={<Edit/>} />
        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  );
};

export default App;