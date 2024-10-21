import React from 'react';
import { QueryMachine } from './stateMachines/queryMachine';
import './output.css';
import ChatModule from './components/ChatModule';


function App() {
  return (
    <QueryMachine>
     <ChatModule />
    </QueryMachine>
  );
}

export default App;
