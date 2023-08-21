
import { UserClass, UserModel } from './model/user';

import { ArticleClass, ArticleModel } from './model/article';


//增加数据
var u = new UserClass();
u.username = '张三';
u.password = '12345655654757';
UserModel.add(u);



//获取user表数据
var res = UserModel.get(123);
console.log(res);



//获取文章表的数据
var aRes = ArticleModel.get(1);
console.log(aRes);
