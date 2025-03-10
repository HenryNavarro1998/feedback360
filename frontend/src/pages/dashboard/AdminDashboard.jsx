import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import dashboardService from '../../services/dashboard.service';
import evaluationService from '../../services/evaluation.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  DashboardContainer,
  DashboardHeader,
  HeaderTitle,
  UserInfo,
  UserName,
  LogoutButton,
  DashboardContent,
  StatsGrid,
  StatCard,
  StatTitle,
  StatValue,
  StatChange,
  SectionTitle,
  TableContainer,
  Table,
  Th,
  Td,
  Badge,
  ActionButton
} from '../../styles/dashboard.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTests, setRecentTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, recentData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentEvaluations()
        ]);

        setStats(statsData);
        setRecentTests(recentData);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        toast.error('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <DashboardContainer>


      <DashboardContent>
        <StatsGrid>
          <StatCard>
            <StatTitle>Total Empleados</StatTitle>
            <StatValue>{stats?.totalEmployees || 0}</StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>Evaluaciones Activas</StatTitle>
            <StatValue>{stats?.activeEvaluations || 0}</StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>Modelos de Evaluación</StatTitle>
            <StatValue>{stats?.evaluationModels || 0}</StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>Evaluaciones Pendientes</StatTitle>
            <StatValue>{stats?.pendingEvaluations || 0}</StatValue>
          </StatCard>
        </StatsGrid>

        <SectionTitle>Evaluaciones Recientes</SectionTitle>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Empleado</Th>
                <Th>Tipo de Evaluación</Th>
                <Th>Fecha</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map(test => (
                <tr key={test._id}>
                  <Td>{`${test.employee?.firstName} ${test.employee?.lastName}`}</Td>
                  <Td>{test.evaluationModel?.name}</Td>
                  <Td>{new Date(test.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Badge status={test.status}>
                      {test.status === 'completed' ? 'Completado' : 
                       test.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                    </Badge>
                  </Td>
                  <Td>
                    <ActionButton onClick={() => navigate(`/evaluations/${test._id}`)}>
                      Ver Detalles
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 