import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';
import { ActionButtonProps } from './types';

export const ActionsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[8]};
  padding-top: ${theme.spacing[8]};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

export const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.blue[600]};
          color: ${theme.colors.white};
          border: none;

          &:hover {
            background: ${theme.colors.blue[700]};
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.white};
          color: ${theme.colors.gray[700]};
          border: 1px solid ${theme.colors.gray[300]};

          &:hover {
            background: ${theme.colors.gray[50]};
            border-color: ${theme.colors.gray[400]};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.red[600]};
          color: ${theme.colors.white};
          border: none;

          &:hover {
            background: ${theme.colors.red[700]};
          }
        `;
      default:
        return '';
    }
  }}
`; 