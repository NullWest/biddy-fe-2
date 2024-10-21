import React, { createContext, useContext, useState, ReactNode } from 'react';

/*
  Eventually switch this to a DB-driven system 
  for state based on whether User ID is known.
*/

// Define placehoder 
const STATE_ONE = 'STATE_ONE';
const STATE_TWO = 'STATE_TWO';

interface QueryMachineContextType {
  state: string;
  conversationsData: MessageStructure[]; // Use correct type for the conversations
  addConversationsData: (response: MessageStructure) => void; 
  transitionToStateTwo: () => void;
  transitionToStateOne: () => void;
}

interface MessageStructure {
  userName: string,
  message: string,
  timestamp: number,
  isUser: boolean,
}

// Create Context with an initial value of undefined
const QueryMachineContext = createContext<QueryMachineContextType | undefined>(undefined);

// Define the provider component
export const QueryMachine = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(STATE_ONE);
  const [conversationsData, setConversationsData] = useState<MessageStructure[]>([]);

  const transitionToStateTwo = () => {
    setState(STATE_TWO);
  };

  const transitionToStateOne = () => {
    setState(STATE_ONE);
  };

  const addConversationsData = (response: MessageStructure) => {
    setConversationsData((prevData) => [...prevData, response]);
  };

  const value = {
    state,
    conversationsData,
    addConversationsData,
    transitionToStateTwo,
    transitionToStateOne,
  };

  return (
    <QueryMachineContext.Provider value={value}>
      {children}
    </QueryMachineContext.Provider>
  );
};

// Custom hook to use the QueryMachineContext
export const useQueryMachine = () => {
  const context = useContext(QueryMachineContext);
  if (!context) {
    throw new Error('useQueryMachine must be used within a QueryMachine');
  }
  return context;
};