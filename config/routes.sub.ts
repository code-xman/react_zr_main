const routes = [
  {
    path: '/subapp',
    name: '微应用',
    routes: [
      {
        path: '/subapp',
        redirect: '/home',
      },
      {
        name: '首页 SUB',
        path: '/subapp/home',
      },
      {
        name: '权限演示 SUB',
        path: '/subapp/access',
      },
      {
        name: ' CRUD 示例 SUB',
        path: '/subapp/table',
      },
    ],
  },
];

export default routes;
