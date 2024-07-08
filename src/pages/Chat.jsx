import React, { useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import SingleChatBox from '../components/SingleChatBox';

const Chat = () => {
  const inputRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const deleteChats = async () => {
    console.log('delete chats');
  };
  const handleSubmit = async () => {
    console.log('input value is: ', inputMessage);
  };
  const staticUser = {
    fullname: 'Alex Joseph',
  };

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
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3 w-full h-full mt-3 p-3'>
        <div className='col-span-1 flex flex-col space-y-3'>
          <div className='flex w-full h-[60vh] bg-[#3397e9] rounded-lg p-3 flex-col'>
            <div className='text-center'>
              <p className='font-work-sans text-lg text-white'>
                You are talking to a ChatBOT
              </p>
              <p className='font-work-sans text-sm text-white my-4 p-3'>
                You can ask some questions related to Knowledge, Business,
                Advice, Education, etc. But avoid sharing personal information.
              </p>
              <button
                onClick={deleteChats}
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
          <div className='w-full h-[60vh] rounded-lg bg-[#1E293B] p-3 flex flex-col overflow-y-auto'>
            {staticChats.map((chat, index) => (
              <SingleChatBox
                content={chat.content}
                role={chat.role}
                user={staticUser}
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
