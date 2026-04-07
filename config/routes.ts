/**
 * @name umi 的路由配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User，修改后未展示需重启项目
 * @param hideInMenu 设置为true时，表示隐藏自己和子菜单
 * @param tabsRender 设置为false时，表示隐藏tbs标签
 * @param isKeepalive 设置为true时，表示缓存当前界面
 * @param target 设置为'_blank'时，表示在新页面打开
 * @param access 权限配置，需要与 plugin-access 插件配合使用
 * @param accessAny 多权限配置任意权限成立即可，值为权限编码数组，需要与 plugin-access 插件配合使用
 * @param accessAll 多权限配置全部权限成立即可，值为权限编码数组，需要与 plugin-access 插件配合使用
 * @doc https://umijs.org/docs/guides/routes
 * @doc https://umijs.org/zh-CN/plugins/plugin-layout
 * @doc https://pro.ant.design/zh-CN/docs/advanced-menu
 */

import routerSub from './routes.sub';

const routes = [
  {
    path: '/',
    // component: '@/layouts/CustomLayout', // 指定自定义布局
    redirect: '/home',
  },
  {
    name: '登录',
    path: '/login1',
    component: './Login/login1',
    hideInMenu: true,
    layout: false,
  },
  {
    name: '全息登录',
    path: '/login2',
    component: './Login/login2',
    hideInMenu: true,
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: 'AI 聊天',
    path: '/chat',
    component: './Chat',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: 'CRUD 示例',
    path: '/table',
    component: './Table',
  },
  {
    name: 'Models',
    path: '/models',
    routes: [
      {
        name: '用户信息1',
        path: '/models/user1',
        component: './UserInfo/User1',
        access: 'canSeeUser1', // 访问权限，access.ts中对应字段控制
      },
      {
        name: '用户信息2',
        path: '/models/user2',
        component: './UserInfo/User2',
        access: 'canSeeUser2',
      },
    ],
  },
  {
    name: 'Charts',
    path: '/Charts',
    routes: [
      {
        name: 'AntdCharts',
        path: '/Charts/AntdCharts',
        routes: [
          {
            name: 'AntdCharts 折线图',
            path: '/Charts/AntdCharts/line',
            component: './Charts/AntdCharts/Line',
          },
          {
            name: 'AntdCharts 柱状图',
            path: '/Charts/AntdCharts/column',
            component: './Charts/AntdCharts/Column',
          },
        ],
      },
    ],
  },
  {
    name: 'Three',
    path: '/threes',
    routes: [
      {
        name: 'base',
        path: '/threes/base',
        component: './Three/Base',
      },
    ],
  },
  ...routerSub,
];

export default routes;
