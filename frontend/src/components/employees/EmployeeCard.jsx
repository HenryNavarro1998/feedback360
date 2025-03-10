import React from 'react';
import styled from 'styled-components';
import { 
  EnvelopeSimple, 
  Phone, 
  Buildings, 
  UserCircle,
  PencilSimple,
  Trash
} from "@phosphor-icons/react";

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'delete' ? '#fee2e2' : '#e0f2fe'};
  color: ${props => props.variant === 'delete' ? '#ef4444' : '#0284c7'};
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'delete' ? '#fecaca' : '#bae6fd'};
  }
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 1rem 0 0.5rem 0;
`;

const Position = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;

  svg {
    color: #94a3b8;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.active ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.active ? '#16a34a' : '#ef4444'};
`;

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const isActive = employee?.status === 'active';

  const handleDelete = () => {
    if (!employee?._id) {
      console.error('ID de empleado no encontrado');
      return;
    }
    onDelete(employee._id);
  };

  return (
    <Card>
      <CardHeader>
        <Avatar>
          <UserCircle size={40} weight="light" />
        </Avatar>
        <Actions>
          <ActionButton onClick={() => onEdit(employee)}>
            <PencilSimple size={20} />
          </ActionButton>
          <ActionButton 
            variant="delete" 
            onClick={handleDelete}
            title={isActive ? "Desactivar empleado" : "Activar empleado"}
          >
            <Trash size={20} />
          </ActionButton>
        </Actions>
      </CardHeader>

      <Name>{employee.firstName} {employee.lastName}</Name>
      <Position>
        {employee.position}
        <StatusBadge active={isActive}>
          {isActive ? 'Activo' : 'Inactivo'}
        </StatusBadge>
      </Position>

      <InfoList>
        <InfoItem>
          <EnvelopeSimple size={20} />
          {employee.email}
        </InfoItem>
        <InfoItem>
          <Phone size={20} />
          {employee.phone}
        </InfoItem>
        <InfoItem>
          <Buildings size={20} />
          {employee.department}
        </InfoItem>
      </InfoList>
    </Card>
  );
};

export default EmployeeCard; 