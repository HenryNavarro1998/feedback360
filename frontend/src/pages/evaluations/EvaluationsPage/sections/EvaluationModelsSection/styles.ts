import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';
import { ActionButtonProps } from './types';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing[6]};
`;

export const ModelCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing[6]};
`;

export const ModelInfo = styled.div`
  flex: 1;
  margin-right: ${theme.spacing[4]};
`;

export const ModelName = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[2]};
`;

export const ModelDescription = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
  line-height: ${theme.lineHeight.normal};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

export const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${theme.spacing[10]};
  height: ${theme.spacing[10]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case 'edit':
        return `
          background: ${theme.colors.blue[50]};
          color: ${theme.colors.blue[600]};

          &:hover {
            background: ${theme.colors.blue[100]};
          }
        `;
      case 'delete':
        return `
          background: ${theme.colors.red[50]};
          color: ${theme.colors.red[600]};

          &:hover {
            background: ${theme.colors.red[100]};
          }
        `;
      default:
        return '';
    }
  }}
`;

export const Stats = styled.div`
  display: flex;
  gap: ${theme.spacing[6]};
  padding-top: ${theme.spacing[6]};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
`; 