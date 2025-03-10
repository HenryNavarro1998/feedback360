import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const InfoSection = styled.section`
  margin-bottom: ${theme.spacing.xlarge};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.large};
  margin-bottom: ${theme.spacing.xlarge};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.medium};
  }
`;

export const InfoCard = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.large};
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.grayLight};
  transition: transform ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Label = styled.div`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.small};
`;

export const Value = styled.div`
  font-size: ${theme.fontSize.medium};
  color: ${theme.colors.text};
  font-weight: 500;
`; 