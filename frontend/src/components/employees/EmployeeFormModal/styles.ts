import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xlarge};
  border-radius: ${theme.borderRadius.large};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 90%;
    padding: ${theme.spacing.large};
    margin: ${theme.spacing.medium};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xlarge};
`;

export const ModalTitle = styled.h2`
  font-size: ${theme.fontSize.xlarge};
  font-weight: 600;
  color: ${theme.colors.text};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray};
  cursor: pointer;
  padding: ${theme.spacing.small};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;

export const Form = styled.form`
  display: grid;
  gap: ${theme.spacing.large};
`;

interface FormGroupProps {
  columns?: string;
}

export const FormGroup = styled.div<FormGroupProps>`
  display: grid;
  gap: ${theme.spacing.medium};
  grid-template-columns: ${props => props.columns || '1fr'};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.small};
  font-weight: 500;
  color: ${theme.colors.gray};
`;

export const Input = styled.input`
  padding: ${theme.spacing.medium};
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSize.small};
  transition: all ${theme.transitions.fast};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.grayLight};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.medium};
  margin-top: ${theme.spacing.large};
`;

interface ActionButtonProps {
  variant?: 'primary' | 'secondary';
}

export const ActionButton = styled.button<ActionButtonProps>`
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  ${props => props.variant === 'secondary' ? `
    background: ${theme.colors.white};
    color: ${theme.colors.gray};
    border: 1px solid ${theme.colors.grayLight};
    
    &:hover {
      background: ${theme.colors.background};
    }
  ` : `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    
    &:hover {
      background: ${theme.colors.secondary};
    }
  `}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`; 