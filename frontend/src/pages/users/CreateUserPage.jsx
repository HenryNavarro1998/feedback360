import React from 'react';
import styled from 'styled-components';
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/users/UserForm';
import userService from '../../services/user.service';

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

const CreateUserPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    await userService.createUser(userData);
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate('/users')}>
          <CaretLeft size={20} />
          Volver a Usuarios
        </BackButton>
        <Title>Crear Usuario</Title>
      </Header>

      <UserForm onSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default CreateUserPage; 