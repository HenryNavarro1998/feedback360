import styled from 'styled-components';
import { theme } from '../../../styles/theme';

interface TabProps {
  active: boolean;
}

interface StatusBadgeProps {
  status: 'completed' | 'in_progress' | 'pending';
}

interface ProgressFillProps {
  progress: number;
}

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

export const FiltersContainer = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.boxShadow.sm};
  margin-bottom: ${theme.spacing[6]};
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing[4]};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[700]};
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[2]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[900]};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 0 1px ${theme.colors.blue[500]};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[2]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[900]};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 0 1px ${theme.colors.blue[500]};
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'secondary' ? `
    background: ${theme.colors.white};
    color: ${theme.colors.gray[700]};
    border: 1px solid ${theme.colors.gray[300]};

    &:hover {
      background: ${theme.colors.gray[50]};
    }
  ` : `
    background: ${theme.colors.blue[600]};
    color: ${theme.colors.white};
    border: none;

    &:hover {
      background: ${theme.colors.blue[700]};
    }
  `}
`;

export const Table = styled.table`
  width: 100%;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.boxShadow.sm};
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: ${theme.spacing[3]};
  text-align: left;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[600]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const Td = styled.td`
  padding: ${theme.spacing[3]};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const StatusBadge = styled.span<{ status: 'draft' | 'in_progress' | 'completed' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
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

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing[1]};
  color: ${theme.colors.gray[500]};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[8]};
`;

export const Tab = styled.button<TabProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ active }) => active ? `
    background: ${theme.colors.blue[600]};
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.blue[700]};
    }
  ` : `
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[600]};

    &:hover {
      background: ${theme.colors.gray[200]};
    }
  `}
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  background: ${theme.colors.blue[600]};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.blue[700]};
  }
`;

export const EvaluationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
`;

export const EvaluationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.large};
`;

export const EvaluationCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.large};
  box-shadow: ${theme.shadows.small};
  border: 1px solid ${theme.colors.grayLight};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.medium};
`;

export const ModelName = styled.h3`
  font-size: ${theme.fontSize.large};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small};
`;

export const EmployeeName = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.small};
`;

export const ParticipantsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.small};
  margin-bottom: ${theme.spacing.small};
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.small};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
`;

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  background: ${theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width ${theme.transitions.medium};
`;

export const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.small};
  width: 100%;
  padding: ${theme.spacing.medium};
  margin-top: ${theme.spacing.medium};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.gray};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`; 