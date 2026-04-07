// 抑制第三方库的 findDOMNode 废弃警告
// 该警告来自 qiankun 或 ant-design/pro-components 等依赖库内部使用
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('findDOMNode is deprecated')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}
