import React, { useState } from 'react';
import './App.css';
// import Hello from './components/Hello'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'


const App: React.FC = () => {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <LikeButton />
      {/* button: <button onClick={() => { setShow(!show) }}>Toggle Tracker</button>
      { show && <MouseTracker /> } */}
    </div>
  );
}

export default App;
