// 监听路由变化，判断是否为子应用
export const isSubApp = () => {
  return ['/subapp'].some(route => window.location.pathname.startsWith(route));
}