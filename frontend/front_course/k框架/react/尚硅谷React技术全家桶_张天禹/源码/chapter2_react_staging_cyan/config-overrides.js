//配置具体的修改规则
const { override, fixBabelImports,addLessLoader} = require('customize-cra');

// 课件备份
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true,
// 	}),
// 	addLessLoader({
// 		lessOptions:{
// 			javascriptEnabled: true,
// 			modifyVars: { '@primary-color': 'green' },
// 		}
// 	}),
// );

module.exports = override(
	fixBabelImports('import', {
	  libraryName: 'antd',
	  libraryDirectory: 'es',
	  style: 'css'
	  }),
  );