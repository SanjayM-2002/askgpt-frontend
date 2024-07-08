import axios from 'axios';
import React from 'react';

const Home = () => {
  const helloApi = async () => {
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/chat/hello`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('response from backend is: ', response.data);
    } catch (error) {
      console.log('error is: ', error);
    }
  };
  return (
    <>
      <div>Home</div>
      <button className='bg-red-200 p-4' onClick={helloApi}>
        Hello
      </button>
    </>
  );
};

export default Home;
