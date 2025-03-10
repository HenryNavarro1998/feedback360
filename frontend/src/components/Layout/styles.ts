import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${theme.spacing.xlarge};
  background-color: ${theme.colors.background};
  overflow-y: auto;
`; 