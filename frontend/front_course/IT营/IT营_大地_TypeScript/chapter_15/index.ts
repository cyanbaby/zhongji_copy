/* ------------------------- 把类作为参数来约束数据传入的类型 结束 ------------------------- */

(() => {

  // 定义一个 User 的类这个类的作用就是映射数据库字段  
  // 然后定义一个 MysqlDb 的类这个类用于操作数据库   
  // 然后把 User类 作为参数 传入到 MysqlDb 中
  // var user = new User({
  //   username: '张三',
  //   password: '123456'
  // })

  // var Db = new MysqlDb();
  // Db.add(user);


  // 把类作为参数来约束数据传入的类型 
  class User {
    username: string | undefined;
    pasword: string | undefined;
  }


  class MysqlDb {

    add(user: User): boolean {
      console.log(user);  // User { username: '张三', pasword: '123456' }
      return true;
    }

  }

  var u = new User();
  u.username = '张三';
  u.pasword = '123456';

  var Db = new MysqlDb();
  Db.add(u);

});

/* ------------------------- 把类作为参数来约束数据传入的类型 结束 ------------------------- */








/* ------------------------- 问题：代码重复，给文章表添加数据 开始 ------------------------- */

(() => {

  // 问题：代码重复  给文章表添加数据
  class ArticleCate {
    title: string | undefined;
    desc: string | undefined;
    status: number | undefined
  }


  class MysqlDb {

    add(info: ArticleCate): boolean {
      console.log(info);
      console.log(info.title);
      return true;
    }

  }

  var a = new ArticleCate();
  a.title = "国内";
  a.desc = "国内新闻";
  a.status = 1;

  var Db = new MysqlDb();
  Db.add(a);

});

/* ------------------------- 问题：代码重复，给文章表添加数据 结束 ------------------------- */





/* ------------------------- 定义操作数据库的泛型类 开始 ------------------------- */

(() => {

  // 定义操作数据库的泛型类
  class MysqlDb<T>{

    add(info: T): boolean {
      console.log('\r\n')
      console.group('MysqlDb 类 add 方法 输出：')
      console.log('info =>', info);
      console.groupEnd()
      return true;
    }

    updated(info: T, id: number): boolean {
      console.log('\r\n')
      console.group('MysqlDb 类 updated 方法 输出：')
      console.log('info =>', info);
      console.log('id =>', id);
      console.groupEnd()
      return true;
    }
  }


  // 想给User表增加数据

  // 1、定义一个User类 和数据库进行映射
  class User {
    username: string | undefined;
    pasword: string | undefined;
  }

  var u = new User();
  u.username = '张三';
  u.pasword = '123456';


  var Db = new MysqlDb<User>();
  Db.add(u);






  // 2、相关ArticleCate增加数据  定义一个ArticleCate类 和数据库进行映射
  class ArticleCate {
    title: string | undefined;
    desc: string | undefined;
    status: number | undefined;

    constructor(params: {
      title: string | undefined,
      desc: string | undefined,
      status?: number | undefined
    }) { // 实例化的时候给属性传值
      this.title = params.title;
      this.desc = params.desc;
      this.status = params.status;
    }

  }


  // 增加操作
  var a2 = new ArticleCate({
    title: '分类',
    desc: '1111',
    status: 1
  });

  console.log('\r\n')
  console.group('外部输出a, a 是 ArticleCate 的实例 ：')
  console.log(a2);
  console.groupEnd()

  // 类当做参数的泛型类
  var Db2 = new MysqlDb<ArticleCate>();
  Db2.add(a2);





  // 修改数据
  var a3 = new ArticleCate({
    title: '分类3333',
    desc: '33333'
  });

  a3.status = 0;

  var Db3 = new MysqlDb<ArticleCate>();
  Db3.updated(a3, 12);


});

/* ------------------------- 定义操作数据库的泛型类 结束 ------------------------- */