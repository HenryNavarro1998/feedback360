import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { List } from "@phosphor-icons/react";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

const ContentContainer = styled.main`
  flex: 1;
  margin-left: ${props => props.isCollapsed ? '64px' : '250px'};
  padding: 2rem;
  background: #f8fafc;
  transition: margin-left 0.3s ease;
  min-width: 0;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 3.5rem 1rem 1rem;
  }
`;

const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: white;
    padding: 0 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 25;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #64748b;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const MobileTitle = styled.h1`
  margin-left: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => !props.isCollapsed ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
`;

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(window.innerWidth <= 768);
  
  console.log('DashboardLayout render:', { user }); // Debug log

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsNavCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  if (!user) {
    console.log('DashboardLayout: No user, returning null');
    return null;
  }

  return (
    <LayoutContainer>
      <MobileHeader>
        <MobileMenuButton onClick={handleToggleNav}>
          <List size={24} />
        </MobileMenuButton>
        <MobileTitle>Feedback 360°</MobileTitle>
      </MobileHeader>
      
      <Navbar 
        isCollapsed={isNavCollapsed} 
        onToggle={handleToggleNav}
      />
      
      <Overlay 
        isCollapsed={isNavCollapsed} 
        onClick={() => setIsNavCollapsed(true)}
      />
      
      <ContentContainer isCollapsed={isNavCollapsed}>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default DashboardLayout; 