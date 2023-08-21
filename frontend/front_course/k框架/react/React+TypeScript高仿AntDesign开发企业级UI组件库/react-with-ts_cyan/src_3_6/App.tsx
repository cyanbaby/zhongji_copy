import React from 'react';
import './App.css';
// import Hello from './components/Hello'
import LikeButton from './components/LikeButton'


const App: React.FC = () => {
  return (
    <div className="App">
      <LikeButton />
    </div>
  );
}

export default App;
