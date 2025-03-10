import styled from 'styled-components';

const colors = {
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  primaryDark: '#1d4ed8',
  secondary: '#059669',
  secondaryLight: '#10b981',
  warning: '#eab308',
  error: '#ef4444',
  gray: '#64748b',
  grayLight: '#f1f5f9',
  white: '#ffffff'
};

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${colors.grayLight};
`;

export const DashboardHeader = styled.header`
  background: ${colors.white};
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  color: ${colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserName = styled.span`
  color: ${colors.gray};
  font-weight: 500;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const DashboardContent = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: ${colors.white};
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const StatTitle = styled.h3`
  color: ${colors.gray};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const StatValue = styled.p`
  color: ${colors.primary};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const StatChange = styled.span`
  color: ${props => props.increase ? colors.secondary : colors.error};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const SectionTitle = styled.h2`
  color: ${colors.gray};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const TableContainer = styled.div`
  background: ${colors.white};
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: ${colors.grayLight};
  color: ${colors.gray};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid ${colors.grayLight};
  color: ${colors.gray};
  font-size: 0.875rem;
`;

export const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'completed': return `${colors.secondary}20`;
      case 'pending': return `${colors.warning}20`;
      case 'failed': return `${colors.error}20`;
      default: return `${colors.gray}20`;
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return colors.secondary;
      case 'pending': return colors.warning;
      case 'failed': return colors.error;
      default: return colors.gray;
    }
  }};
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'danger' ? colors.error : colors.primary};
  color: ${colors.white};
  border: none;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 