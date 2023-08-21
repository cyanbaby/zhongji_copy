import React, { useState, useEffect } from 'react'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)

  // 第一个参数是一个函数，包含副作用逻辑
  // 第二个参数是一个数组，包含依赖项，当依赖项变化时触发副作用
  useEffect(() => {
    document.title = `点击了${like}次`
  })
  // }, []);
  // 如果依赖项为空数组，副作用只会在组件挂载和卸载时执行一次

  return (
    <>
      <button onClick={() => { setLike(like + 1) }}>
        {like}
      </button>
      <button onClick={() => { setOn(!on) }}>
        {on ? 'ON': 'OFF'}
      </button>
    </>
  )
}
export default LikeButton