import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const Header = styled.div`
  margin-bottom: ${theme.spacing.xlarge};
  border-bottom: 1px solid ${theme.colors.grayLight};
  padding-bottom: ${theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize.xlarge};
  color: ${theme.colors.text};
  margin: 0;
`;

export const Status = styled.span`
  display: inline-block;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.small};
  font-weight: 500;

  ${({ status }) => {
    const statusColors = {
      pending: {
        bg: '#fef3c7',
        text: '#92400e'
      },
      in_progress: {
        bg: '#dbeafe',
        text: '#1e40af'
      },
      completed: {
        bg: '#dcfce7',
        text: '#166534'
      }
    };

    const colors = statusColors[status] || {
      bg: theme.colors.grayLight,
      text: theme.colors.gray
    };

    return `
      background-color: ${colors.bg};
      color: ${colors.text};
    `;
  }}
`; 