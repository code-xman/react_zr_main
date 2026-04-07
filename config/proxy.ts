interface ProxyConfig {
  [key: string]: {
    target: string | undefined;
    changeOrigin: boolean;
    pathRewrite: { [key: string]: string };
    secure: boolean;
  };
}

interface ProxyEnvConfig {
  dev: ProxyConfig;
  pro: ProxyConfig;
  test: ProxyConfig;
  pre: ProxyConfig;
}

const target = process.env.APP_BASE_URL;

const proxyService: string[] = [
];

export const proxy = proxyService.reduce((acc: any, cur) => {
  acc[cur] = {
    target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
    secure: false,
  };
  return acc;
}, {});

const proxyConfig: ProxyEnvConfig = {
  dev: proxy,
  pro: proxy,
  test: proxy,
  pre: {},
};

export default proxyConfig;
