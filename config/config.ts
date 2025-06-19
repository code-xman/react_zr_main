import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '数字底座平台',
  },
  routes,
  npmClient: 'pnpm',
  qiankun: {
    master: {
      sandbox: {
        experimentalStyleIsolation: true, // 样式沙箱
      }
    }
  },
});
