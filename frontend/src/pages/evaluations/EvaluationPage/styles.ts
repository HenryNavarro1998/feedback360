import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const PageContainer = styled.div`
  padding: ${theme.spacing[6]};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[6]};
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.gray[900]};
`;

export const Section = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.boxShadow.sm};
  margin-bottom: ${theme.spacing[6]};
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[4]};
`;

export const StatusBadge = styled.span<{ status: 'draft' | 'in_progress' | 'completed' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};

  ${props => {
    switch (props.status) {
      case 'draft':
        return `
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[700]};
        `;
      case 'in_progress':
        return `
          background: ${theme.colors.yellow[100]};
          color: ${theme.colors.yellow[700]};
        `;
      case 'completed':
        return `
          background: ${theme.colors.green[100]};
          color: ${theme.colors.green[700]};
        `;
      default:
        return '';
    }
  }}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
`;

export const InfoGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const Label = styled.div`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[500]};
  margin-bottom: ${theme.spacing[1]};
`;

export const Value = styled.div`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.gray[900]};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: ${theme.colors.white};
          color: ${theme.colors.gray[700]};
          border: 1px solid ${theme.colors.gray[300]};

          &:hover {
            background: ${theme.colors.gray[50]};
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
        return `
          background: ${theme.colors.blue[600]};
          color: ${theme.colors.white};
          border: none;

          &:hover {
            background: ${theme.colors.blue[700]};
          }
        `;
    }
  }}
`;

export const ParticipantsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing[4]};
`;

export const ParticipantCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
`;

export const ParticipantName = styled.div`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[1]};
`;

export const ParticipantRole = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.gray[500]};
  text-transform: capitalize;
`;

export const CompletionStatus = styled.div<{ completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.fontSize.sm};
  color: ${props => props.completed ? theme.colors.green[600] : theme.colors.yellow[600]};
  margin-top: ${theme.spacing[2]};
`;

export const ErrorMessage = styled.div`