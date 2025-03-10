import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../../components/users/UserForm';
import userService from '../../services/user.service';
import LoadingSpinner from '../../components/LoadingSpinner';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const data = await userService.getUser(id);
      setUser(data);
    } catch (err) {
      console.error('Error al cargar usuario:', err);
      setError(err.response?.data?.message || 'Error al cargar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (userData) => {
    await userService.updateUser(id, userData);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: '#ef4444', padding: '1rem' }}>{error}</div>;

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate('/users')}>
          <CaretLeft size={20} />
          Volver a Usuarios
        </BackButton>
        <Title>Editar Usuario</Title>
      </Header>

      <UserForm user={user} onSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default EditUserPage; 