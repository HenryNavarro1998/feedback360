import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const InfoSection = styled.section`
  margin-bottom: ${theme.spacing[8]};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[6]};

  @media (min-width: ${theme.screens.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const InfoCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
  margin-bottom: ${theme.spacing[2]};

  svg {
    color: ${theme.colors.gray[400]};
  }
`;

export const Value = styled.div`
  color: ${theme.colors.gray[900]};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
`; 