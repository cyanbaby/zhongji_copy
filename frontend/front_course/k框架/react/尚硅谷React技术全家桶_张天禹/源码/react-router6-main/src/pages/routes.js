/* eslint-disable */

/*
 * @Date: 2023-03-25 17:35:37
 */
import {Navigate} from 'react-router-dom'
import About from './About'
import Home from './Home'
import Message from './Home/Message'
import News from './Home/News'
import Detail from './Home/Message/Detail'

export default [
  {path: '/about', element: <About/>},
  {path: '/home', element: <Home/>, children: [
    {path: 'message', element: <Message/>, children: [
      // params参数传值
      // {path: 'detail/:id/:title', element: <Detail/>}
      // search参数、state传值
      {path: 'detail', element: <Detail/>}
    ]},
    {path: 'news', element: <News/>}
  ]},
  {path: '/', element: <Navigate to="/about"/>}
]