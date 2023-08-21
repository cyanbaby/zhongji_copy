import {NavLink, Outlet} from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <h3>我是Home的内容</h3>
      <div>
        <ul className="nav nav-tabs">
          <li>
            <NavLink className={({isActive}) => isActive ? 'list-group-item selected': 'list-group-item'} to="news">
              news
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => isActive ? 'list-group-item selected': 'list-group-item'} to="message">
              messages
            </NavLink>  
          </li>   
        </ul>
        <br/>
        {/* 路由占位符 */}
        <Outlet/>
      </div>
    </div>
  )
}
