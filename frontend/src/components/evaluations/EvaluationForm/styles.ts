import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
  max-width: 800px;
  margin: 0 auto;
`;

export const Section = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.boxShadow.sm};
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[4]};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.colors.gray[900]};
  font-weight: ${theme.fontWeight.medium};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[600]};
    box-shadow: 0 0 0 3px ${theme.colors.blue[100]};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSize.sm};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[600]};
    box-shadow: 0 0 0 3px ${theme.colors.blue[100]};
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'secondary' ? theme.colors.gray[100] : theme.colors.blue[600]};
  color: ${props => props.variant === 'secondary' ? theme.colors.gray[700] : theme.colors.white};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'secondary' ? theme.colors.gray[200] : theme.colors.blue[700]};
  }

  &:disabled {
    background: ${theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

export const PreviewSection = styled.div`
  margin-top: ${theme.spacing[8]};
  padding: ${theme.spacing[8]};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.boxShadow.sm};
`;

export const QuestionPreview = styled.div`
  margin-bottom: ${theme.spacing[8]};
  padding: ${theme.spacing[6]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const QuestionText = styled.h4`
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[4]};
`;

export const OptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[3]};
  background: ${theme.colors.gray[50]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.red[600]};
  padding: ${theme.spacing[4]};
`; 