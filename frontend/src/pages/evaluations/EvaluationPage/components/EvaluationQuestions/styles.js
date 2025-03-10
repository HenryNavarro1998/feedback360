import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const QuestionsSection = styled.section`
  margin-bottom: ${theme.spacing.xlarge};
`;

export const QuestionCard = styled.div`
  padding: ${theme.spacing.large};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.grayLight};
  margin-bottom: ${theme.spacing.large};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Question = styled.p`
  color: ${theme.colors.text};
  font-weight: 500;
  margin-bottom: ${theme.spacing.medium};
  font-size: ${theme.fontSize.medium};
`;

export const OptionsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.small};
`;

export const OptionButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.medium};
  text-align: left;
  background: ${props => props.isSelected ? theme.colors.primary + '10' : theme.colors.white};
  border: 1px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.grayLight};
  border-radius: ${theme.borderRadius.medium};
  color: ${props => props.isSelected ? theme.colors.primary : theme.colors.text};
  transition: all ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${props => props.isSelected ? theme.colors.primary + '20' : theme.colors.background};
    border-color: ${props => props.isSelected ? theme.colors.primary : theme.colors.gray};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.medium};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
  margin-top: ${theme.spacing.xlarge};
  transition: background-color ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${theme.colors.secondary};
  }

  &:disabled {
    background: ${theme.colors.gray};
    cursor: not-allowed;
  }
`; 