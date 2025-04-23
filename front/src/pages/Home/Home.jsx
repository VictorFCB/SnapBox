import React, { useState, useEffect } from 'react';
import { Upload, Button, Layout, Typography, Card, Row, Col, Image, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';

const Home = () => {
  const [fileList, setFileList] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/files`)
      .then(({ data }) => setFiles(data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = () => {
    if (!fileList.length) return;
    
    const formData = new FormData();
    formData.append('file', fileList[0].originFileObj);

    axios.post(`${API_URL}/upload`, formData)
      .then(({ data }) => {
        setFiles([data, ...files]);
        setFileList([]);
      });
  };

  const handleDelete = (fileId, filePath) => {
    setDeletingId(fileId);
    axios.delete(`${API_URL}/files/${fileId}`, { data: { path: filePath } })
      .then(() => setFiles(files.filter(file => file.id !== fileId)))
      .finally(() => setDeletingId(null));
  };

  const isVideo = (file) => file.mimetype?.startsWith('video/') || file.url?.endsWith('.mp4');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Title level={3} style={{ color: '#fff', margin: '16px 0' }}>SnapBox</Title>
      </Header>
      
      <Content style={{ padding: '24px' }}>
        <Card title="Upload de Arquivo" style={{ marginBottom: 24 }}>
          <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
            accept="image/*,video/*"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Selecionar Arquivo</Button>
          </Upload>
          
          {fileList.length > 0 && (
            <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }}>
              Enviar Arquivo
            </Button>
          )}
        </Card>

        <Card title="Arquivos Disponíveis" loading={loading}>
          <Row gutter={[16, 16]}>
            {files.length > 0 ? files.map(file => (
              <Col key={file.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={isVideo(file) ? (
                    <video controls style={{ width: '100%', height: '160px', objectFit: 'cover' }} src={file.url} />
                  ) : (
                    <Image src={file.url} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  )}
                  actions={[
                    <Popconfirm
                      title="Excluir arquivo?"
                      onConfirm={() => handleDelete(file.id, file.path)}
                    >
                      <Button danger icon={<DeleteOutlined />} loading={deletingId === file.id} />
                    </Popconfirm>
                  ]}
                >
                  <Card.Meta title={file.name} description={`${Math.round(file.size / 1024)} KB`} />
                </Card>
              </Col>
            )) : (
              <Text type="secondary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                Nenhum arquivo encontrado
              </Text>
            )}
          </Row>
        </Card>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>SnapBox © {new Date().getFullYear()}</Footer>
    </Layout>
  );
};

export default Home;