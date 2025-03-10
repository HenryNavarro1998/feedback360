import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const QuestionsSection = styled.section`
  margin-bottom: ${theme.spacing[8]};
`;

export const QuestionCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing[6]};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Question = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[4]};
`;

export const OptionsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing[3]};
`;

export const OptionButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing[4]};
  background: ${props => props.isSelected ? theme.colors.blue[50] : theme.colors.white};
  border: 1px solid ${props => props.isSelected ? theme.colors.blue[500] : theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  color: ${props => props.isSelected ? theme.colors.blue[700] : theme.colors.gray[700]};
  font-size: ${theme.fontSize.sm};
  text-align: left;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover:not(:disabled) {
    background: ${props => props.isSelected ? theme.colors.blue[100] : theme.colors.gray[50]};
    border-color: ${props => props.isSelected ? theme.colors.blue[600] : theme.colors.gray[300]};
  }
`;

export const NoQuestionsMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing[8]};
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSize.lg};
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  width: 100%;
  padding: ${theme.spacing[4]};
  background: ${theme.colors.blue[600]};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.blue[700]};
  }

  &:disabled {
    background: ${theme.colors.gray[300]};
    cursor: not-allowed;
  }
`; 