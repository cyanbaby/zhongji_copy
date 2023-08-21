import React, { useState, useEffect } from "react";

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("add effect", positions.x);
    const updateMouse = (e: MouseEvent) => {
      console.log("inner");
      setPositions({ x: e.clientX, y: e.clientY });
    }
    document.addEventListener("click", updateMouse);
    // 如果 useEffect 返回一个函数，react将在执行清除操作时调用它
    // 例如，当组件卸载时，清除操作会被执行
    // 每次渲染时都会执行当前useEffect之前都会对上一个useEffect进行清除
    return () => {
      console.log("remove effect", positions.x);
      document.removeEventListener("click", updateMouse);
    }
  })

  console.log('before render', positions.x);
  return (
    <p>X: {positions.x}, Y: {positions.y}</p>
  )
};
export default MouseTracker;