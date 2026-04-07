import React, { useState } from 'react';
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './login1.less';

interface LoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

const Login1: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      message.success('登录成功！');
      console.log('登录信息:', values);
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.background}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.gridLines} />
        <div className={styles.scanLine} />
      </div>

      <div className={styles.loginCard}>
        <div className={styles.cardBorder} />
        <div className={styles.cardContent}>
          <div className={styles.logoSection}>
            <RocketOutlined className={styles.logoIcon} />
            <h1 className={styles.title}>科技登录</h1>
            <p className={styles.subtitle}>欢迎回来，请登录您的账户</p>
          </div>

          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleFinish}
            autoComplete="off"
            className={styles.loginForm}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined className={styles.inputIcon} />}
                placeholder="用户名"
                size="large"
                className={styles.input}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="密码"
                size="large"
                className={styles.input}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.checkbox}>记住我</Checkbox>
              </Form.Item>
              <a className={styles.forgotPassword} href="#">
                忘记密码？
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className={styles.loginButton}
                block
              >
                登录
              </Button>
            </Form.Item>

            <div className={styles.divider}>
              <span>或</span>
            </div>

            <div className={styles.registerLink}>
              还没有账户？ <a href="#">立即注册</a>
            </div>
          </Form>
        </div>

        <div className={styles.decorations}>
          <div className={styles.corner} />
          <div className={styles.corner} />
          <div className={styles.corner} />
          <div className={styles.corner} />
        </div>
      </div>
    </div>
  );
};

export default Login1;
