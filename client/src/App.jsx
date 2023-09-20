import React from 'react';
import Chat from './components/Chat';
import io from 'socket.io-client';
import './App.css'

function App() {
  const socket = io('http://127.0.0.1:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });
  return (
   <>
    <Chat socket={socket} />
   </>
  )
}

export default App
