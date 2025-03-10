import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import userService from '../../services/user.service';
import LoadingSpinner from '../../components/LoadingSpinner';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  align-items: start;
`;

const UserCardContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
`;

const UserEmail = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
`;

const UserRole = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.role) {
      case 'admin':
        return '#fef3c7';
      case 'evaluator':
        return '#dcfce7';
      case 'employee':
        return '#dbeafe';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${props => {
    switch (props.role) {
      case 'admin':
        return '#92400e';
      case 'evaluator':
        return '#166534';
      case 'employee':
        return '#1e40af';
      default:
        return '#475569';
    }
  }};
`;

const EmployeeInfo = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const EmployeeName = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;

  span {
    color: #1e293b;
    font-weight: 500;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.edit {
    background: #dbeafe;
    color: #2563eb;

    &:hover {
      background: #bfdbfe;
      color: #1d4ed8;
    }
  }

  &.delete {
    background: #fee2e2;
    color: #dc2626;

    &:hover {
      background: #fecaca;
      color: #b91c1c;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
`;

const UserCard = ({ user, onEdit, onDelete }) => (
  <UserCardContainer>
    <UserHeader>
      <UserInfo>
        <UserName>{`${user.employeeId.firstName} ${user.employeeId.lastName}`}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <UserRole role={user.role}>
          {user.role === 'admin' ? 'Administrador' : 
           user.role === 'evaluator' ? 'Evaluador' : 'Empleado'}
        </UserRole>
      </UserInfo>
      <Actions>
        <ActionButton 
          className="edit" 
          onClick={() => onEdit(user._id)}
          title="Editar usuario"
        >
          <PencilSimple size={20} />
        </ActionButton>
        <ActionButton 
          className="delete" 
          onClick={() => onDelete(user._id)}
          title="Eliminar usuario"
        >
          <Trash size={20} />
        </ActionButton>
      </Actions>
    </UserHeader>
    <EmployeeInfo>
      <EmployeeName>
        Cargo: <span>{user.employeeId.position}</span>
      </EmployeeName>
      <EmployeeName>
        Departamento: <span>{user.employeeId.department}</span>
      </EmployeeName>
    </EmployeeInfo>
  </UserCardContainer>
);

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError(err.response?.data?.message || 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      await userService.deleteUser(userId);
      await loadUsers();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      alert(err.response?.data?.message || 'Error al eliminar el usuario');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: '#ef4444', padding: '1rem' }}>{error}</div>;

  return (
    <PageContainer>
      <Header>
        <Title>Usuarios</Title>
        <AddButton onClick={() => navigate('/users/new')}>
          <Plus size={20} />
          Nuevo Usuario
        </AddButton>
      </Header>

      {users.length === 0 ? (
        <EmptyState>No hay usuarios registrados</EmptyState>
      ) : (
        <UsersGrid>
          {users.map(user => (
            <UserCard 
              key={user._id}
              user={user}
              onEdit={(id) => navigate(`/users/edit/${id}`)}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </UsersGrid>
      )}
    </PageContainer>
  );
};

export default UsersPage; 