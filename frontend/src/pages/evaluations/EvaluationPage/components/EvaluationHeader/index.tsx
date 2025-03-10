import React from 'react';
import { 
  CheckCircle,
  Clock
} from "@phosphor-icons/react";
import { EvaluationHeaderProps } from './types';
import {
  Header,
  TitleContainer,
  Title,
  StatusBadge
} from './styles';

export const EvaluationHeader: React.FC<EvaluationHeaderProps> = ({
  title,
  status
}) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle size={20} />,
          text: 'Completada'
        };
      case 'in_progress':
        return {
          icon: <Clock size={20} />,
          text: 'En Progreso'
        };
      default:
        return {
          icon: <Clock size={20} />,
          text: 'Borrador'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Header>
      <TitleContainer>
        <Title>{title || 'Evaluación sin título'}</Title>
        <StatusBadge status={status}>
          {statusInfo.icon}
          {statusInfo.text}
        </StatusBadge>
      </TitleContainer>
    </Header>
  );
}; 