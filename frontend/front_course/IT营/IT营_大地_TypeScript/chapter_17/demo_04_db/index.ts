
// 操作用户表   定义一个User类和数据表做映射
import { MsSqlDb } from './modules/db'


class User {
  username: string | undefined;
  password: string | undefined;
}


var u = new User();
u.username = '张三2222';
u.password = '123456';

var oMssql = new MsSqlDb<User>();
oMssql.add(u);
