import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const ResponseContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.boxShadow.sm};
`;

export const QuestionCard = styled.div`
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

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

interface OptionItemProps {
  selected?: boolean;
  readOnly?: boolean;
}

export const OptionItem = styled.label<OptionItemProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[3]};
  background: ${props => props.selected ? theme.colors.blue[50] : theme.colors.gray[50]};
  border: 1px solid ${props => props.selected ? theme.colors.blue[200] : theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  cursor: ${props => props.readOnly ? 'default' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.readOnly ? theme.colors.gray[50] : theme.colors.blue[50]};
  }
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  background: ${theme.colors.blue[600]};
  color: ${theme.colors.white};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.blue[700]};
  }

  &:disabled {
    background: ${theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing[4]};
  right: ${theme.spacing[4]};
  background: none;
  border: none;
  color: ${theme.colors.gray[500]};
  cursor: pointer;
  padding: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.lg};

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[900]};
  }
`;

export const Header = styled.div`
  margin-bottom: ${theme.spacing[8]};
`;

export const Title = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[2]};
`;

export const Subtitle = styled.p`
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSize.sm};
`;

export const RadioInput = styled.input`
  display: none;
`;

interface RadioLabelProps {
  checked?: boolean;
}

export const RadioLabel = styled.label<RadioLabelProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[3]};
  background: ${props => props.checked ? theme.colors.blue[50] : theme.colors.gray[50]};
  border: 1px solid ${props => props.checked ? theme.colors.blue[200] : theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.blue[50]};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  margin-top: ${theme.spacing[4]};
  font-size: ${theme.fontSize.sm};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[600]};
    box-shadow: 0 0 0 3px ${theme.colors.blue[100]};
  }
`;

export const CommentSection = styled.div`
  margin-top: ${theme.spacing[8]};
`; 