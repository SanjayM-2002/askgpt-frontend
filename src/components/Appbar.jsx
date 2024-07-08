import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
import axios from 'axios';

const Appbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const setCurrentUser = useSetRecoilState(userAtom);
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const clickLogo = () => {
    navigate('/');
  };
  const fullname = currentUser?.fullname;
  // const handleLogout = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BACKEND_BASE_URL}/api/v1/users/logout`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await res.json();
  //     console.log('response from backend is: ', data);
  //     if (data.error) {
  //       console.log('Error in request is: ', data.error);
  //       toast.error('Error in Logout', { id: 'Logout' });
  //       return;
  //     }
  //     localStorage.removeItem('currentUser');
  //     setCurrentUser(null);
  //     toast.success('Successfully logged out', { id: 'Logout' });
  //     navigate('/login');
  //   } catch (error) {
  //     console.log('Error is: ', error);
  //     toast.error('Error in Logout', { id: 'Logout' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/users/logout`,
        {
          withCredentials: true, // Ensure credentials (cookies) are sent
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      console.log('response from backend is: ', data);
      if (data.error) {
        console.log('Error in request is: ', data.error);
        toast.error('Error in Logout', { id: 'Logout' });
        return;
      }
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      toast.success('Successfully logged out', { id: 'Logout' });
      navigate('/login');
    } catch (error) {
      console.log('Error is: ', error);
      toast.error('Error in Logout', { id: 'Logout' });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className='shadow bg-slate-400  flex justify-between items-center md:px-10'>
        <Link to={'/'}>
          <button
            className='flex flex-row justify-center items-center gap-1 bg-yellow-200 hover:bg-orange-300 transition duration-300 px-2 py-2 border rounded'
            onClick={clickLogo}
          >
            <img src='openai.png' className='w-12 h-12' />
            <div className='flex flex-col justify-center h-full ml-4 font-bold text-3xl'>
              ASK GPT
            </div>
          </button>
        </Link>
        <div className='flex items-center justify-center gap-2'>
          {currentUser && !currentUser.error && (
            <>
              <button
                className='w-full text-white bg-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-gray-300 mt-4 mb-4 px-5 py-3 font-semibold text-base border rounded'
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className='flex flex-col justify-center h-full mr-4'>
                {fullname}
              </div>
              <div className='rounded-full h-10 w-10 p-4 bg-blue-500 flex justify-center mr-2'>
                <div className='flex flex-col justify-center h-full text-xl text-yellow-200'>
                  {fullname[0].toUpperCase()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Appbar;
