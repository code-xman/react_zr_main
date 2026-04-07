import { defineConfig } from '@umijs/max';
import { config as dotenvConfig } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';
import proxy from './proxy';
import routes from './routes';

const envMode = process.env.REACT_APP_ENV || process.env.UMI_ENV || 'dev';
const envFile = resolve(__dirname, '..', `.env.${envMode}`);
if (existsSync(envFile)) {
  dotenvConfig({ path: envFile, override: true });
}

const { REACT_APP_ENV = 'dev' } = process.env;
const DEFAULT_NAME = '功能演练平台';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: DEFAULT_NAME,
  },
  define: {
    'process.env': process.env,
    DEFAULT_NAME,
  },
  routes,
  // 代理配置
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  npmClient: 'pnpm',
  qiankun: {
    master: {
      sandbox: {
        experimentalStyleIsolation: true, // 样式沙箱
      },
    },
  },
});
