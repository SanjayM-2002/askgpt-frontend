import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/Appbar';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import InvalidPage from './pages/InvalidPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';

function App() {
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      (!currentUser || currentUser.error) &&
      location.pathname !== '/signup'
    ) {
      navigate('/login');
    }
  }, [currentUser, navigate, location.pathname]);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='*' element={<InvalidPage />} />
      </Routes>
    </>
  );
}

export default App;
