import React, { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import SingleChatBox from '../components/SingleChatBox';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const Chat = () => {
  const inputRef = useRef(null);
  const currentUser = useRecoilValue(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async () => {
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    console.log('input value is: ', inputMessage);
    const formData = {
      message: inputMessage,
    };
    // const newMessage = {role: "user", content: inputMessage};
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/chat/new-chat`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.error) {
        console.log('Error in new chat is: ', data.error);
        toast.error('Error in New Chat', { id: 'New chat' });
        return;
      }
      toast.success('Success in New Chat', { id: 'New chat' });
      setChatList([...data.chats]);
      setInputMessage('');
    } catch (error) {
      console.error('Error in New Chat:', error);
      toast.error('Error in New Chat', { id: 'New Chat' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${BACKEND_BASE_URL}/api/v1/chat/clear-chats`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.error) {
        console.log('Error in Clear Chat is: ', data.error);
        toast.error('Error in Clear Chat', { id: 'Clear chat' });
        return;
      }
      if (res.status === 200) {
        setChatList([]);
      }
    } catch (error) {
      console.error('Error in Clear Chat:', error);
      toast.error('Error in Clear Chat', { id: 'Clear Chat' });
    } finally {
      setIsLoading(false);
    }
  };
  const staticUser = {
    fullname: 'Alex Joseph',
  };

  const [chatList, setChatList] = useState([]);
  const fetchUserChats = async () => {
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/chat/fetch-chats`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;

      if (data.error) {
        console.log('Error in request is: ', data.error);
        toast.error('Error in Fetch chats', { id: 'Fetch chats' });
        return;
      }
      // console.log('data from fetch chats is: ', data.userchats);
      // console.log('response from backend is: ', data);
      if (data.userchats && data.userchats.length > 0) {
        setChatList([...data.userchats]);
      }
      toast.success('Success in Fetch chats', { id: 'Fetch chats' });
    } catch (error) {
      console.log('error is: ', error);
      toast.error('Error in Fetch chats', { id: 'Fetch chats' });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserChats();
  }, []);

  // console.log('chat list is: ', chatList);

  const staticChats = [
    {
      role: 'user',
      content: 'What is UEFA?',
      _id: '668b98533964e7387d824be6',
    },
    {
      role: 'assistant',
      content:
        'UEFA stands for Union of European Football Associations. It is the administrative body for association football in Europe, responsible for the organization of various tournaments and competitions for national teams and clubs.\n',
      _id: '668b98543964e7387d824be7',
    },
    {
      role: 'user',
      content: 'What is its fullform?',
      _id: '668b988e3964e7387d824bef',
    },
    {
      role: 'assistant',
      content:
        'The full form of UEFA is:\n' +
        '\n' +
        'U - Union\n' +
        'E - European\n' +
        'F - Football\n' +
        'A - Associations',
      _id: '668b988f3964e7387d824bf0',
    },
  ];
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3 w-full h-full mt-3 p-3'>
        <div className='col-span-1 flex flex-col space-y-3'>
          <div className='flex w-full h-[60vh] bg-[#3397e9] rounded-lg p-3 flex-col'>
            <div className='text-center'>
              <p className='font-work-sans text-lg text-white'>
                This is AskGPT Chatbot
              </p>
              <p className='font-work-sans text-sm text-white my-4 p-3'>
                Please avoid sharing sensitive information.
              </p>
              <button
                onClick={clearChat}
                className='px-4 py-2 my-auto text-white font-bold rounded-lg mx-auto bg-red-500 hover:bg-red-600 transition duration-300'
              >
                Clear Conversation
              </button>
            </div>
          </div>
        </div>
        <div className='col-span-3 flex flex-col space-y-3'>
          <p className='text-3xl text-red-500 mb-2 mx-auto font-semibold text-center'>
            Model - Llama 3
          </p>
          <div className='w-full h-[60vh] rounded-lg bg-[#1E293B] p-3 flex flex-col overflow-y-auto overflow-x-auto'>
            {chatList.length > 0 &&
              chatList.map((chat, index) => (
                <SingleChatBox
                  content={chat.content}
                  role={chat.role}
                  user={currentUser}
                  key={index}
                />
              ))}
          </div>
          <div className='w-full rounded-lg bg-[#111B27] flex items-center p-4'>
            <input
              ref={inputRef}
              type='text'
              className='flex-grow bg-transparent p-3 border-none outline-none text-white text-lg'
              placeholder='Type your message...'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className='text-white ml-2 p-3 rounded-full bg-blue-700 hover:bg-blue-400 transition duration-300 flex items-center justify-center'
            >
              <IoMdSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
