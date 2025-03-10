import React from 'react';
import { 
  EnvelopeSimple, 
  Phone, 
  Buildings, 
  UserCircle,
  PencilSimple,
  Trash
} from "@phosphor-icons/react";
import { 
  Card, 
  CardHeader, 
  Avatar, 
  Actions, 
  ActionButton,
  Name,
  Position,
  InfoList,
  InfoItem
} from './styles';
import { EmployeeCardProps } from './types';

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card>
      <CardHeader>
        <Avatar>
          <UserCircle size={32} weight="light" />
        </Avatar>
        <Actions>
          <ActionButton variant="edit" onClick={() => onEdit(employee)}>
            <PencilSimple size={20} />
          </ActionButton>
          <ActionButton variant="delete" onClick={() => onDelete(employee._id)}>
            <Trash size={20} />
          </ActionButton>
        </Actions>
      </CardHeader>

      <Name>{`${employee.firstName} ${employee.lastName}`}</Name>
      <Position>{employee.position}</Position>

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