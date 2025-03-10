import React from 'react';
import { Header, Title, Status } from './styles';
import { EvaluationHeaderProps } from './types';

export const EvaluationHeader = ({ title, status }: EvaluationHeaderProps) => {
  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pendiente',
      in_progress: 'En Progreso',
      completed: 'Completada'
    };
    return statusMap[status] || status;
  };

  return (
    <Header>
      <Title>{title || 'Sin nombre'}</Title>
      <Status status={status}>
        {getStatusText(status)}
      </Status>
    </Header>
  );
}; 