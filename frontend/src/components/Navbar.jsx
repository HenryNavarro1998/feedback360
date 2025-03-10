import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { SignOut, User } from '@phosphor-icons/react';

const NavbarContainer = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <NavbarContainer>
      <UserInfo>
        <User size={20} />
        <span>{user?.email}</span>
      </UserInfo>
      <LogoutButton onClick={logout}>
        <SignOut size={20} />
        Cerrar sesión
      </LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar; 