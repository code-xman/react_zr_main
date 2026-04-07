import React, { useState, useEffect } from 'react';
import { UserOutlined, LockOutlined, ThunderboltOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './login2.less';

interface LoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

const Login2: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      message.success('访问已授权');
      console.log('登录信息:', values);
    } catch (error) {
      message.error('访问被拒绝');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.background}>
        <div className={styles.noiseOverlay} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.decorations}>
        <div className={styles.geometricShape} />
        <div className={styles.geometricShape} />
        <div className={styles.geometricShape} />
        <div className={styles.warningStripe} />
        <div className={styles.warningStripe} />
        <div className={styles.industrialLabel}>
          <WarningOutlined />
          <span>SECURE ACCESS</span>
        </div>
      </div>

      <div className={`${styles.loginCard} ${mounted ? styles.mounted : ''}`}>
        <div className={styles.cardOverlay} />
        
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className={styles.headerDecoration}>
              <div className={styles.decorationLine} />
              <div className={styles.decorationLine} />
            </div>
            <h1 className={styles.title}>
              <span className={styles.titleMain}>SYSTEM</span>
              <span className={styles.titleAccent}>ACCESS</span>
            </h1>
            <p className={styles.subtitle}>授权登录系统 // v3.0.1</p>
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
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <UserOutlined />
                </div>
                <Input
                  placeholder="用户名"
                  size="large"
                  className={styles.input}
                />
                <div className={styles.inputDecoration} />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <LockOutlined />
                </div>
                <Input.Password
                  placeholder="密码"
                  size="large"
                  className={`${styles.input} ${styles.password}`}
                />
                <div className={styles.inputDecoration} />
              </div>
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.checkbox}>
                  <span>保持会话</span>
                </Checkbox>
              </Form.Item>
              <a className={styles.forgotPassword} href="#">
                忘记凭证？
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
                icon={<ThunderboltOutlined />}
              >
                授权访问
              </Button>
            </Form.Item>

            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>OR</span>
              <div className={styles.dividerLine} />
            </div>

            <div className={styles.registerLink}>
              <span>新用户？</span>
              <a href="#">申请访问权限</a>
            </div>
          </Form>

          <div className={styles.footer}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>系统在线</span>
            </div>
            <div className={styles.footerDecorations}>
              <div className={styles.footerLine} />
              <div className={styles.footerLine} />
            </div>
          </div>
        </div>

        <div className={styles.cardDecorations}>
          <div className={styles.cornerDecoration} />
          <div className={styles.cornerDecoration} />
          <div className={styles.cornerDecoration} />
          <div className={styles.cornerDecoration} />
        </div>
      </div>

      <div className={styles.floatingElements}>
        <div className={styles.floatingElement} />
        <div className={styles.floatingElement} />
        <div className={styles.floatingElement} />
      </div>
    </div>
  );
};

export default Login2;
