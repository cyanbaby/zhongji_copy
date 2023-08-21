module.exports = {
  title: "我的语雀项目",
  description: "这是一个使用 VuePress 1.9 搭建的类似语雀的项目",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "小说",
        link: "/guide/introduction.html",
      },
      {
        text: "前端",
        link: "/frontend/introduction.html",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "小说",
          // collapsable: false,
          children: [
            ["introduction", "引言"],
            {
              title: "第一章",
              path: "/guide/chapter1.html",
              // collapsable: false,
              children: [
                ["section1", "第一节"],
                ["section2", "第二节"],
              ],
            },
          ],
        },
      ],

      "/frontend/": [
        {
          title: "前端",
          // collapsable: false,
          children: [
            ["introduction", "引言"],
            {
              title: "第一章",
              path: "/frontend/chapter1.html",
              // collapsable: false,
              children: [
                ["chapter1/section1", "第一节"],
                ["chapter1/section2", "第二节"],
              ],
            },
            {
              title: "第二章",
              children: [
                ["chapter2/section1", "第一节"],
                ["chapter2/section2", "第二节"],
              ],
            },
          ],
        },
      ],
    },
  },
};
