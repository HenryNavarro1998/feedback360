import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const PageContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.xlarge};
  box-shadow: ${theme.shadows.small};
  max-width: ${theme.breakpoints.desktop};
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.medium};
    border-radius: ${theme.borderRadius.medium};
  }
`; 