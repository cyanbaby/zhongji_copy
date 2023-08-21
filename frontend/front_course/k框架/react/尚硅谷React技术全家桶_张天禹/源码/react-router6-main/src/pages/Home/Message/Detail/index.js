import {useLocation} from 'react-router-dom'
export default function Detail() {
  // 也可以用useMatch()方法获取params参数，但是用的不多，useParams更方便
  // const {id, title} = useParams()

  // 获取search的值：useSearchParams、useLocation（获取location对象）
  // const [search, setSearch] = useSearchParams()
  // let id = search.get('id')
  // let title = search.get('title')

  // 获取state的值
  const {state: {id, title}} = useLocation()
  return (
    <ul>
      <li>ID：{id}</li>
      <li>TITLE：{title}</li>
      <li>CONTENT：xxx</li>
    </ul>
  )
}
