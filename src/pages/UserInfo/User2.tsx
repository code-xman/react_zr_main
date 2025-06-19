import { PageContainer } from '@ant-design/pro-components';
// @ts-ignore
import { useModel } from '@umijs/max';
import { Button, Input } from 'antd';
import { useState } from 'react';

const User = () => {
  // useModel 的 namespace(也就是'user') 为 src/models 里对应的文件名
  const { name, setName } = useModel('user');
  const [value, setValue] = useState(name);

  return (
    <PageContainer ghost header={{ title: '', breadcrumb: {} }}>
      <h1>用户信息页面二</h1>
      <p>用户名为：{name}</p>
      <Input
        value={value}
        allowClear
        style={{ width: 300 }}
        placeholder="请输入用户名"
        defaultValue={name}
        onChange={(e) => setValue(e.target.value)}
        addonAfter={
          <Button
            size="small"
            variant="text"
            color="default"
            onClick={() => setName(value)}
          >
            提交
          </Button>
        }
      />
    </PageContainer>
  );
};

export default User;
