import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Appbar = () => {
  const navigate = useNavigate();
  const currentUser = {
    fullname: 'John Doe',
  };
  const fullname = currentUser?.fullname;
  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    // setCurrentUser(null);
    navigate('/signin');
  };
  return (
    <>
      <div className='shadow bg-slate-400  flex justify-between items-center md:px-10'>
        <Link to={'/'}>
          <div className='flex flex-row justify-center items-center gap-4'>
            <img src='openai.png' className='w-16 h-16' />
            <div className='flex flex-col justify-center h-full ml-4 font-bold'>
              ASK GPT
            </div>
          </div>
        </Link>
        <div className='flex items-center justify-center gap-2'>
          {currentUser && !currentUser.error && (
            <>
              <button
                className='w-full text-white bg-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-gray-300 mt-4 mb-4 px-5 py-3 font-semibold text-base border rounded'
                onClick={handleSignout}
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
