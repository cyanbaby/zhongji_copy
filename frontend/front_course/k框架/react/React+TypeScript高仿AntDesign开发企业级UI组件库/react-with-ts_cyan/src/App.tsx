import React, { useState } from 'react';
import './App.css';
// import Hello from './components/Hello'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import useMousePosition from './hooks/useMousePosition'
import withLoader from './components/withLoader'

const App: React.FC = () => {
  const [show, setShow] = useState(true)
  const positions = useMousePosition()
  return (
    <div className="App">
      
      button: <button onClick={() => { setShow(!show) }}>Toggle Tracker</button>
      <p>X: {positions.x}, Y: {positions.y}</p>
      <LikeButton />
    </div>
  );
}

export default App;
