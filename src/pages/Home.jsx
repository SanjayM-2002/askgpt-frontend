import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const navigateToChat = () => {
    navigate('/chat');
  };

  return (
    <>
      <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center'>
        <div className='max-w-md p-8 bg-white shadow-lg rounded-lg'>
          <h1 className='font-extrabold text-blue-800 mb-4 text-4xl'>
            ASK GPT
          </h1>
          <div className='mb-4'>
            <p className='text-gray-600 mb-2 text-3xl'>
              <span className='font-bold'>Welcome to ASK GPT,</span> your
              virtual assistant powered by the Llama 3 model from Groq API.
            </p>
            <p className='text-blue-600 mb-2 text-lg'>
              Feel free to ask any questions related to technology, sports,
              finance, or anything else you're curious about.
            </p>
            <p className='text-red-600 mb-2 text-lg font-semibold'>
              Please refrain from sharing sensitive information and avoid
              posting offensive or inappropriate messages.
            </p>
          </div>
          <button
            onClick={navigateToChat}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300'
          >
            Start Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
