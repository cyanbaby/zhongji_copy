// module.exports = {
//   themeConfig: {
//     sidebar: [
//       {
//         text: "简介",
//         link: "/introduction",
//       },
//       {
//         text: "第一章：起始",
//         children: [
//           {
//             text: "场景1",
//             link: "/chapter-1/scene-1",
//           },
//           {
//             text: "场景2",
//             link: "/chapter-1/scene-2",
//           },
//           {
//             text: "场景3",
//             link: "/chapter-1/scene-3",
//           },
//         ],
//       },
//       {
//         text: "第二章：冲突",
//         children: [
//           {
//             text: "场景1",
//             link: "/chapter-2/scene-1",
//           },
//           {
//             text: "场景2",
//             link: "/chapter-2/scene-2",
//           },
//         ],
//       },
//       // 更多章节...
//     ],
//   },
// };



module.exports = {
  title: '我的语雀项目',
  description: '这是一个使用 VuePress 1.9 搭建的类似语雀的项目',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '指南',
        link: '/guide/introduction.html',
      },
    ],
    sidebar: {

      '/guide/': [
        {
          title: '指南1',
          // collapsable: false,
          children: [
            ['introduction', '引言'],
            {
              title: '第一章',
              path: '/guide/chapter1.html',
              // collapsable: false,
              children: [
                ['section1', '第一节'],
                ['section2', '第二节'],
              ],
            },
          ],
        },
      ],


    },
  },
};
