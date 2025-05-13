import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Table,
  message
} from 'antd';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title as ChartTitle,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, ChartTitle);

const { Title, Text } = Typography;

const Admin = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    online_users: 0,
    most_active_user: null,
    user_logs: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin-stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        message.error('Erro ao buscar estatísticas do sistema.');
      }
    };

    fetchStats();
  }, []);

  const { total_users, online_users, user_logs } = stats;

  // Agrupar tempo total de sessão por e-mail
  const sessionMap = user_logs.reduce((acc, log) => {
    if (!log.email) return acc;
    acc[log.email] = (acc[log.email] || 0) + (log.session_duration_minutes || 0);
    return acc;
  }, {});

  // Gerar gráfico para todos os usuários autenticados
  const allUsers = Object.entries(sessionMap).sort((a, b) => b[1] - a[1]);

  const pieChartData = {
    labels: allUsers.map(([email]) => email),
    datasets: [
      {
        label: 'Minutos de Sessão',
        data: allUsers.map(([_, duration]) => duration),
        backgroundColor: allUsers.map((_, i) =>
          ['#1B5CFF', '#3EC1D3', '#FF9A00', '#FF6384', '#36A2EB', '#FFCE56'][i % 6]
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
  };

  // Top 3 usuários mais ativos
  const topUsers = allUsers.slice(0, 3);

  const formatDateTime = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    // Ajusta para o fuso horário de São Paulo (UTC-3)
    const offset = -3 * 60; // -3 horas em minutos
    const localTime = date.getTime();
    const utcTime = localTime + (date.getTimezoneOffset() * 60000);
    const adjustedTime = utcTime + (offset * 60000);
    const adjustedDate = new Date(adjustedTime);
    
    return adjustedDate.toLocaleString('pt-BR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Login',
      dataIndex: 'login_time',
      key: 'login_time',
      render: formatDateTime,
    },
    {
      title: 'Logout',
      dataIndex: 'logout_time',
      key: 'logout_time',
      render: formatDateTime,
    },
    {
      title: 'Mais acessado',
      dataIndex: 'most_viewed_path',
      key: 'most_viewed_path',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Painel de Administração</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total de Usuários Autenticados" value={total_users} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Usuários Online" value={online_users} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Text strong>Top 3 Usuários Mais Ativos</Text>
            <div style={{ marginTop: 8 }}>
              {topUsers.map(([email, duration], index) => (
                <div key={email} style={{ marginBottom: 4 }}>
                  <Text>{index + 1}. {email}</Text>{' '}
                  <Text type="secondary">({duration} min)</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Tempo de Sessão por Usuário (Total)" style={{ marginBottom: 24, height: 320 }}>
        <div style={{ height: 240 }}>
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      </Card>

      <Card title="Histórico de Sessões">
        <Table
          dataSource={user_logs}
          columns={columns}
          rowKey={(record) => `${record.email}-${record.login_time}`}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Admin;
