import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/LoginAccount';
import SignUp from './components/Signup';
import ConfirmEmail from './components/ConfirmEmail';
import CustomerDetail from './components/CustomerDetail';
import Reservation from './components/Reservation';
import QR from './components/QR';
import Scanner from './components/Scanner';
import History from './components/History';
import Recharge from './components/Recharge';
import Done from './components/Return';
import ChatRoom from './components/ConnectSocket';
import Error from './components/Error';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recharge' element={<Recharge />} />
        <Route path='/return' element={<Done />} />
        <Route path='/history/:id' element={<History />} />
        <Route path='/qr' element={<QR />} />
        <Route path='/scanner' element={<Scanner />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/error' element={<Error />} />
        <Route path='/detail' element={<CustomerDetail />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/verify/:code' element={<ConfirmEmail />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
