import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';
import { StatusBadgeProps } from './types';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[8]};
  padding-bottom: ${theme.spacing[6]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
`;

export const StatusBadge = styled.div<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};

  ${({ status }) => {
    switch (status) {
      case 'completed':
        return `
          background: ${theme.colors.green[100]};
          color: ${theme.colors.green[600]};
        `;
      case 'in_progress':
        return `
          background: ${theme.colors.yellow[100]};
          color: ${theme.colors.yellow[600]};
        `;
      default:
        return `
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[600]};
        `;
    }
  }}
`; 