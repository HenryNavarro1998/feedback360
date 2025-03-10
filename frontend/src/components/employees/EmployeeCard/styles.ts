import styled from 'styled-components';
import { theme } from '../../../styles/theme';

interface ActionButtonProps {
  variant?: 'delete' | 'edit';
}

export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.large};
  box-shadow: ${theme.shadows.small};
  transition: all ${theme.transitions.fast};
  width: 100%;
  max-width: 400px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.medium};
  gap: ${theme.spacing.medium};
`;

export const Avatar = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  flex-shrink: 0;
`;

export const ActionButton = styled.button<ActionButtonProps>`
  background: ${props => props.variant === 'delete' ? '#fee2e2' : '#e0f2fe'};
  color: ${props => props.variant === 'delete' ? theme.colors.danger : theme.colors.primary};
  border: none;
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.variant === 'delete' ? '#fecaca' : '#bae6fd'};
  }
`;

export const Name = styled.h3`
  font-size: ${theme.fontSize.large};
  font-weight: 600;
  color: ${theme.colors.text};
  margin: ${theme.spacing.medium} 0 ${theme.spacing.small} 0;
  word-break: break-word;
`;

export const Position = styled.p`
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.small};
  margin-bottom: ${theme.spacing.medium};
  word-break: break-word;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.small};
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.small};
  word-break: break-word;

  svg {
    color: ${theme.colors.grayLight};
    flex-shrink: 0;
    margin-top: 3px;
  }
`; 