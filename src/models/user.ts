import { message } from 'antd';
// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);

  const saveName = (name: string) => {
    setName(name);
    message.success(`保存成功: ${name}`);
  };

  return {
    name,
    setName,
    saveName,
  };
};

export default useUser;
