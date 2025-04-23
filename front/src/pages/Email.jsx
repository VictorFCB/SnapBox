import React, { useState } from 'react';
import { Input, Button, Row, Col, Card, message, Select } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!emails.length || !htmlContent) {
      message.warning('Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-email`, {
        to: emails,
        html: htmlContent,
      });

      if (response.data.success) {
        message.success('Emails enviados com sucesso!');
        setEmails([]);
        setHtmlContent('');
      } else {
        message.error('Erro ao enviar os emails!');
      }
    } catch (err) {
      console.error(err);
      message.error('Erro ao enviar email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ padding: 24 }}>
      <Col xs={24} md={20} lg={16}>
        <Card title="Enviar Email com HTML">
          <Select
            mode="tags"
            style={{ width: '100%', marginBottom: 16 }}
            placeholder="Digite ou cole os emails e pressione Enter"
            value={emails}
            onChange={setEmails}
            tokenSeparators={[',']}
          />
          <TextArea
            rows={10}
            placeholder="<html><body>Olá!</body></html>"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            onClick={handleSend}
            loading={loading}
            disabled={!emails.length || !htmlContent}
          >
            Enviar Email
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Email;
