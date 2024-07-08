import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const extractCodeFromString = (message) => {
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
  return [message];
};

const isCodeBlock = (str) => {
  return (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  );
};

const SingleChatBox = ({ content, role, user }) => {
  const messageBlocks = extractCodeFromString(content);

  return role === 'assistant' ? (
    <div className='flex p-2 bg-blue-400 gap-2 w-full rounded-md my-1 pl-10 '>
      <div className='flex-shrink-0'>
        <img src='openai.png' alt='openai' className='w-8 h-8' />
      </div>
      <div>
        {messageBlocks.length === 1 ? (
          <p className='text-lg '>{content}</p>
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language='javascript'
                className=''
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <p key={index} className='text-lg '>
                {block}
              </p>
            )
          )
        )}
      </div>
    </div>
  ) : (
    <div className='flex p-2 bg-orange-200 gap-2 rounded-md my-1 pr-10 '>
      <div className='flex-shrink-0 bg-black text-white rounded-full flex items-center justify-center h-8 w-8'>
        {user?.fullname[0]}
      </div>
      <div>
        {messageBlocks.length === 1 ? (
          <p className='text-lg '>{content}</p>
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language='javascript'
                className=''
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <p key={index} className='text-lg '>
                {block}
              </p>
            )
          )
        )}
      </div>
    </div>
  );
};

export default SingleChatBox;
