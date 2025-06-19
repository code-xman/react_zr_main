import { Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';

export default function CustomLayout() {
  return (
    <ConfigProvider>
      <div>
        <header>自定义头部</header>
        <main>
          {/* 渲染子路由内容 */}
          <Outlet /> 
          {/* 微应用挂载点 */}
          <div id="subapp-container"></div>
        </main>
        <footer>自定义底部</footer>
      </div>
    </ConfigProvider>
  );
}