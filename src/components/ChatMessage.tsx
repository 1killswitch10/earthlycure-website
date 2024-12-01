import React from 'react';
import { Message } from '../types/chat';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isUser = message.role === 'user';

  return (
    <div
      className={clsx(
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div className="max-w-[80%]">
        <div className="text-xs text-gray-500 mb-1 px-2">
          {isUser ? user?.firstname || 'User' : 'Assistant'}
        </div>
        <div
          className={clsx(
            'rounded-lg px-4 py-2',
            isUser ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'
          )}
        >
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-lg font-bold text-green-800 mt-4 mb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-1">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="my-2 text-gray-600">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-red-600 font-semibold">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside my-2 text-gray-600">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="my-1">{children}</li>
                  ),
                }}
              >
                {message.content.includes('⚠️') 
                  ? message.content.split('\n\n').slice(1).join('\n\n')
                  : message.content}
              </ReactMarkdown>
            </div>
          )}
          <span className="text-xs opacity-75 block mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};