import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import {
  House,
  Users,
  ClipboardText,
  ChartLine,
  UserGear,
  UserList
} from '@phosphor-icons/react';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #1e293b;
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
    color: white;
  }

  &.active {
    background-color: #2563eb;
    color: white;
  }
`;

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: <House size={20} />, text: 'Dashboard', roles: ['admin', 'manager', 'employee'] },
    { path: '/employees', icon: <Users size={20} />, text: 'Empleados', roles: ['admin'] },
    { path: '/evaluations', icon: <ClipboardText size={20} />, text: 'Evaluaciones', roles: ['admin', 'manager'] },
    { path: '/reports', icon: <ChartLine size={20} />, text: 'Reportes', roles: ['admin'] },
    { path: '/users', icon: <UserGear size={20} />, text: 'Usuarios', roles: ['admin'] },
    { path: '/team', icon: <UserList size={20} />, text: 'Mi Equipo', roles: ['manager'] },
    { path: '/my-evaluations', icon: <ClipboardText size={20} />, text: 'Mis Evaluaciones', roles: ['employee'] }
  ];

  return (
    <SidebarContainer>
      <Logo>Feedback 360°</Logo>
      <NavList>
        {menuItems
          .filter(item => item.roles.includes(user?.role))
          .map(item => (
            <StyledNavLink key={item.path} to={item.path}>
              {item.icon}
              {item.text}
            </StyledNavLink>
          ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar; 