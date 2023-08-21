import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Outlet, Link} from 'react-router-dom'

export default function News() {
  const navigate = useNavigate()
  const [messages] = useState([
    {id: '001', title: 'message001'},
    {id: '002', title: 'message002'},
    {id: '003', title: 'message003'}
  ])
  function go(id, title) {
    navigate('detail', {
      state: {
        id,
        title
      }
    })
  }
  return (
    <div>
      <ul>
        {
          messages.map(item => {
            return (
                <li key={item.id}>
                  {/* params参数传值 */}
                  {/* <Link to={`detail/${item.id}/${item.title}`}>{item.title}</Link> */}
                  {/* search参数传值 */}
                  {/* <Link to={`detail?id=${item.id}&title=${item.title}`}>{item.title}</Link> */}
                  {/* state传值 */}
                  <Link to={`detail`} state={{
                    id: item.id,
                    title: item.title
                  }}>{item.title}</Link><button onClick={() => go(item.id, item.title)}>跳转</button>
                </li>
            )
          })
        }
      </ul>
      <br/>
      <Outlet/>
    </div>
  )
}
