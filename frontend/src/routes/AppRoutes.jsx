import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { LoginPage } from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard';
import EmployeeDashboard from '../pages/dashboard/EmployeeDashboard';
import { EmployeesPage } from '../pages/employees/EmployeesPage';
import { EvaluationsPage, EvaluationPage } from '../pages/evaluations';
import UsersPage from '../pages/users/UsersPage';
import CreateUserPage from '../pages/users/CreateUserPage';
import EditUserPage from '../pages/users/EditUserPage';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  const DashboardComponent = {
    admin: AdminDashboard,
    manager: ManagerDashboard,
    employee: EmployeeDashboard
  }[user?.role] || EmployeeDashboard;

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      <Route path="/register" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardComponent />} />
        
        {/* Rutas específicas para Admin */}
        <Route path="employees" element={
          <PrivateRoute allowedRoles={['admin']}>
            <EmployeesPage />
          </PrivateRoute>
        } />
        
        {/* Rutas de evaluaciones */}
        <Route path="evaluations" element={
          <PrivateRoute allowedRoles={['admin', 'manager']}>
            <EvaluationsPage />
          </PrivateRoute>
        } />
        <Route path="evaluations/new" element={
          <PrivateRoute allowedRoles={['admin', 'manager']}>
            <EvaluationPage />
          </PrivateRoute>
        } />
        <Route path="evaluations/:id" element={
          <PrivateRoute>
            <EvaluationPage />
          </PrivateRoute>
        } />
        
        {/* Rutas de usuarios */}
        <Route path="users" element={
          <PrivateRoute allowedRoles={['admin']}>
            <UsersPage />
          </PrivateRoute>
        } />
        <Route path="users/new" element={
          <PrivateRoute allowedRoles={['admin']}>
            <CreateUserPage />
          </PrivateRoute>
        } />
        <Route path="users/edit/:id" element={
          <PrivateRoute allowedRoles={['admin']}>
            <EditUserPage />
          </PrivateRoute>
        } />

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 