import React, { useState } from 'react';
import { Layout, Card, Input, Button, message, Form } from 'antd';
import axios from 'axios';

const { Content, Footer } = Layout;

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Função que valida o e-mail e envia o código de verificação
  const handleEmailSubmit = async () => {
    if (!email) {
      message.warning('Por favor, insira seu e-mail.');
      return;
    }

    // Verifica se o e-mail tem o domínio @fcbhealth.com
    if (!email.endsWith('@fcbhealth.com')) {
      message.warning('O e-mail deve ser do domínio @fcbhealth.com');
      return;
    }

    setLoading(true);

    try {
      // Envia o pedido para o backend para gerar e enviar o código de verificação
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-verification-code`, { email });

      if (response.data.success) {
        message.success('Código de verificação enviado para seu e-mail.');
      } else {
        message.error('Erro ao enviar código de verificação.');
      }
    } catch (error) {
      message.error('Erro ao enviar código de verificação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card title="Verificação de E-mail" style={{ width: 400 }}>
          <Form layout="vertical">
            <Form.Item label="E-mail" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                block
                loading={loading}
                onClick={handleEmailSubmit}
              >
                Enviar Código
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
