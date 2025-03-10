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

const EmployeeDashboard = () => {
  const [stats, setStats] = useState(null);
  const [myTests, setMyTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, evaluationsData] = await Promise.all([
          dashboardService.getStats(),
          evaluationService.getAllEvaluations()
        ]);

        // Filtrar evaluaciones para mostrar solo las del empleado actual
        const myEvaluations = evaluationsData.filter(
          evaluate => evaluate.employee?._id === user.employee._id
        );

        setStats(statsData);
        setMyTests(myEvaluations);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        toast.error('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user.employee._id]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (loading) return <LoadingSpinner />;

  // Calcular la próxima evaluación pendiente
  const nextEvaluation = myTests
    .filter(test => test.status === 'pending')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>Mi Panel</HeaderTitle>
        <UserInfo>
          <UserName>{`${user.employee.firstName} ${user.employee.lastName}`}</UserName>
          <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
        </UserInfo>
      </DashboardHeader>

      <DashboardContent>
        <StatsGrid>
          <StatCard>
            <StatTitle>Evaluaciones Completadas</StatTitle>
            <StatValue>
              {myTests.filter(test => test.status === 'completed').length}
            </StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>Evaluaciones Pendientes</StatTitle>
            <StatValue>
              {myTests.filter(test => test.status === 'pending').length}
            </StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>Evaluaciones en Progreso</StatTitle>
            <StatValue>
              {myTests.filter(test => test.status === 'in_progress').length}
            </StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>Próxima Evaluación</StatTitle>
            <StatValue>
              {nextEvaluation ? new Date(nextEvaluation.deadline).toLocaleDateString() : 'No hay pendientes'}
            </StatValue>
          </StatCard>
        </StatsGrid>

        <SectionTitle>Mis Evaluaciones</SectionTitle>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Evaluación</Th>
                <Th>Fecha Asignada</Th>
                <Th>Fecha Límite</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {myTests.map(test => (
                <tr key={test._id}>
                  <Td>{test.evaluationModel?.name}</Td>
                  <Td>{new Date(test.createdAt).toLocaleDateString()}</Td>
                  <Td>{test.deadline ? new Date(test.deadline).toLocaleDateString() : 'No establecida'}</Td>
                  <Td>
                    <Badge status={test.status}>
                      {test.status === 'completed' ? 'Completado' : 
                       test.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                    </Badge>
                  </Td>
                  <Td>
                    <ActionButton onClick={() => navigate(`/evaluations/${test._id}`)}>
                      {test.status === 'completed' ? 'Ver Resultado' : 'Realizar'}
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

export default EmployeeDashboard; 