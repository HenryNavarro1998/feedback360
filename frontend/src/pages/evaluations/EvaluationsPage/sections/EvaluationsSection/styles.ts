import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';
import { StatusBadgeProps, ProgressFillProps } from './types';

export const EvaluationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing[6]};
`;

export const EvaluationCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const ModelName = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[2]};
`;

export const EmployeeName = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
`;

export const StatusBadge = styled.div<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing[4]};

  ${({ status }) => {
    switch (status) {
      case 'completed':
        return `
          background: ${theme.colors.green[100]};
          color: ${theme.colors.green[600]};
        `;
      case 'in_progress':
        return `
          background: ${theme.colors.yellow[100]};
          color: ${theme.colors.yellow[600]};
        `;
      default:
        return `
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[600]};
        `;
    }
  }}
`;

export const ParticipantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
  margin-bottom: ${theme.spacing[3]};
`;

export const ProgressContainer = styled.div`
  margin: ${theme.spacing[4]} 0;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  background: ${theme.colors.blue[600]};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

export const DeadlineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing[4]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

export const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  width: 100%;
  padding: ${theme.spacing[3]};
  margin-top: ${theme.spacing[4]};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray[600]};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[900]};
  }
`; 