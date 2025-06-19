import { isSubApp } from '@/utils/common';
// @ts-ignore
import { RunTimeLayoutConfig } from '@umijs/max';
import { registerMicroApps, start } from 'qiankun';
import { useEffect, useRef } from 'react';
import { actions } from './actions';
import styles from './app.less';

let isRegistered = false; // 防止重复注册

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name?: string }> {
  return {};
}

export const layout: RunTimeLayoutConfig = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 主应用中修改状态
  actions.setGlobalState({ currentSystem: 'main' });

  // 在组件挂载后执行, 确保容器节点已创建，避免在微应用页面刷新后出现空白页（未挂载）的情况
  useEffect(() => {
    // 确保容器节点存在后再注册
    if (!isRegistered && containerRef.current) {
      // 注册微应用
      registerMicroApps([
        {
          name: 'subapp', // app name registered
          entry: 'http://192.168.31.233:8004',
          container: containerRef.current, // 使用 ref 引用
          activeRule: '/subapp',
          props: {
            getContainer: () => containerRef.current, // 动态获取容器
            actions, // 传递全局状态管理对象
          }
        }
      ]);

      //启动 qiankun
      start({
        // 启用沙箱隔离
        sandbox: {
          strictStyleIsolation: true, // 严格样式隔离
          experimentalStyleIsolation: true, // 实验性样式隔离
        },
        prefetch: 'all'
      });

      isRegistered = true;
    }
  }, []);

  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    childrenRender: (children: any) => {
      return (
        <div className={styles.page}>
          {/* <div className={styles.header}></div> */}
          {/* 主应用内容区域 */}
          <div
            id="main-container"
            style={{
              flex: 1,
              position: 'relative',
              display: isSubApp() ? 'none' : 'block',
            }}
          >
            {children}
          </div>

          {/* Qiankun 子应用容器 */}
          <div
            id="subapp-container"
            ref={containerRef} // 使用 ref 绑定
            style={{
              flex: 1,
              position: 'relative',
              display: isSubApp() ? 'block' : 'none',
            }}
          />
        </div>
      );
    },
  };
};
