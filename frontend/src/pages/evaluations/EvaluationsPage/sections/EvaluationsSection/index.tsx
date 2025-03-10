import React from 'react';
import { 
  User,
  CheckCircle,
  Clock,
  CaretRight,
  Calendar,
  Star
} from "@phosphor-icons/react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { EvaluationsSectionProps } from './types';
import {
  EvaluationsGrid,
  EvaluationCard,
  CardHeader,
  ModelName,
  EmployeeName,
  StatusBadge,
  ParticipantInfo,
  ProgressContainer,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  DeadlineInfo,
  ViewButton
} from './styles';

const formatDate = (date: string) => {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
};

export const EvaluationsSection: React.FC<EvaluationsSectionProps> = ({
  evaluations,
  onNavigate
}) => {
  return (
    <EvaluationsGrid>
      {evaluations.map(evaluation => (
        <EvaluationCard 
          key={evaluation._id}
          onClick={() => onNavigate(evaluation._id)}
        >
          <CardHeader>
            <ModelName>
              {evaluation.evaluationModel?.name || 'Modelo sin nombre'}
            </ModelName>
            <EmployeeName>
              <User size={20} />
              {evaluation.employee ? 
                `${evaluation.employee.firstName} ${evaluation.employee.lastName}` :
                'Empleado sin asignar'
              }
            </EmployeeName>
          </CardHeader>

          <StatusBadge status={evaluation.status || 'draft'}>
            {evaluation.status === 'completed' ? (
              <>
                <CheckCircle size={20} />
                Completada
              </>
            ) : evaluation.status === 'in_progress' ? (
              <>
                <Clock size={20} />
                En Progreso
              </>
            ) : (
              <>
                <Clock size={20} />
                Borrador
              </>
            )}
          </StatusBadge>

          {evaluation.evaluator && (
            <ParticipantInfo>
              <User size={20} />
              Evaluador: {evaluation.evaluator.firstName} {evaluation.evaluator.lastName}
            </ParticipantInfo>
          )}

          {evaluation.progress !== undefined && (
            <ProgressContainer>
              <ProgressLabel>
                <span>Progreso</span>
                <span>{evaluation.progress}%</span>
              </ProgressLabel>
              <ProgressBar>
                <ProgressFill progress={evaluation.progress} />
              </ProgressBar>
            </ProgressContainer>
          )}

          {evaluation.averageScore !== undefined && (
            <ParticipantInfo>
              <Star size={20} />
              Puntuación: {evaluation.averageScore.toFixed(1)}
            </ParticipantInfo>
          )}

          {evaluation.deadline && (
            <DeadlineInfo>
              <Calendar size={20} />
              Fecha límite: {formatDate(evaluation.deadline)}
            </DeadlineInfo>
          )}

          <ViewButton>
            Ver Evaluación
            <CaretRight size={20} />
          </ViewButton>
        </EvaluationCard>
      ))}
    </EvaluationsGrid>
  );
}; 