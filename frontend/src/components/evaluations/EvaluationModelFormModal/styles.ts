import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const Modal = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  padding: ${theme.spacing[6]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const Title = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing[4]};
  right: ${theme.spacing[4]};
  background: transparent;
  border: none;
  color: ${theme.colors.gray[500]};
  cursor: pointer;
  padding: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.full};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
  }
`;

export const Form = styled.form`
  padding: ${theme.spacing[6]};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing[6]};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing[2]};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[900]};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 0 2px ${theme.colors.blue[100]};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[900]};
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 0 2px ${theme.colors.blue[100]};
  }
`;

export const QuestionsContainer = styled.div`
  margin-top: ${theme.spacing[6]};
`;

export const QuestionCard = styled.div`
  background: ${theme.colors.gray[50]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[4]};
`;

export const OptionsContainer = styled.div`
  margin-top: ${theme.spacing[4]};
`;

export const OptionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[3]};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
  padding-top: ${theme.spacing[6]};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = 'secondary' }) =>
    variant === 'primary'
      ? `
    background: ${theme.colors.blue[600]};
    color: ${theme.colors.white};
    border: none;

    &:hover {
      background: ${theme.colors.blue[700]};
    }
  `
      : `
    background: ${theme.colors.white};
    color: ${theme.colors.gray[700]};
    border: 1px solid ${theme.colors.gray[300]};

    &:hover {
      background: ${theme.colors.gray[50]};
      border-color: ${theme.colors.gray[400]};
    }
  `}
`; 