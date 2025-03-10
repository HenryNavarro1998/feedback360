import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { LayoutContainer, ContentWrapper, MainContent } from './styles';

export const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentWrapper>
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
}; 