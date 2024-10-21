import React, { useState } from 'react';

// Define the type for props
interface ChatBubbleProps {
  userName: string;
  message: string;
  timestamp: number;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  userName,
  message,
  timestamp,
  isUser,
}) => {
  // State to manage the visibility of additional info (username and timestamp)
  const [showInfo, setShowInfo] = useState(false);

  // Convert timestamp to a readable format
  const formattedTimestamp = new Date(timestamp).toLocaleString();

  return (<>
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4 px-2`}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div
        className={`relative max-w-lg p-4 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <div
          className={`absolute ${
            isUser
              ? '-right-2 bottom-3 border-l-8 border-b-8 border-b-transparent border-l-transparent border-r-blue-500'
              : '-left-2 bottom-3 border-r-8 border-b-8 border-b-transparent border-r-transparent border-l-gray-200'
          }`}
        ></div>
        <div>{message}</div>    
      </div>
    </div>
    <div className={`mt-2 text-xs italic flex ${
            isUser ? 'justify-end' : 'justify-start'
          } mb-4 px-2 ${!showInfo?'invisible':'visible'}`}>{isUser}
          {userName} at {formattedTimestamp}
    </div>
    </>
  );
};

export default ChatBubble;