import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ParticipantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[1]};
`;

export const ParticipantName = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[900]};
`;

export const ParticipantRole = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.gray[500]};
  text-transform: capitalize;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[2]};
  background: ${theme.colors.red[50]};
  color: ${theme.colors.red[600]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.red[100]};
  }
`;

export const AddParticipantButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: ${theme.colors.white};
  border: 1px dashed ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[50]};
    border-color: ${theme.colors.gray[400]};
  }
`;

export const SelectContainer = styled.div`
  position: relative;
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray[900]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 0 2px ${theme.colors.blue[100]};
  }
`; 