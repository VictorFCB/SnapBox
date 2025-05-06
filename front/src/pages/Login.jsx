import React, { useState } from 'react';
import { Layout, Card, Input, Button, Typography, Form, message } from 'antd';
import axios from 'axios';  // Para fazer requisições HTTP

const { Content, Footer } = Layout;
const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      message.warning('Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });

      const { data } = response;

      if (data.session) {
        message.success('Login bem-sucedido!');
        // Salve o token ou sessão no armazenamento local
        localStorage.setItem('access_token', data.session.access_token);
        // Redirecionar para a página principal ou dashboard
        // Exemplo: window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.error || 'Erro ao fazer login');
      } else {
        message.error('Erro ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card title="Login" style={{ width: 400 }}>
          <Form layout="vertical">
            <Form.Item label="Email" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
              />
            </Form.Item>
            <Form.Item label="Senha" required>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block loading={loading} onClick={handleLogin}>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      <Footer style={{ textAlign: 'center' }}>SnapBox © {new Date().getFullYear()}</Footer>
    </Layout>
  );
};

export default Login;
