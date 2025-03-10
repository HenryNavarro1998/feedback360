import React from 'react';
import { 
  User,
  Star,
  Calendar
} from "@phosphor-icons/react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { EvaluationInfoProps, InfoCardProps } from './types';
import {
  InfoSection,
  Grid,
  InfoCard,
  Label,
  Value
} from './styles';

const InfoCardComponent: React.FC<InfoCardProps> = ({ icon, label, value }) => (
  <InfoCard>
    <Label>
      {icon}
      {label}
    </Label>
    <Value>{value}</Value>
  </InfoCard>
);

export const EvaluationInfo: React.FC<EvaluationInfoProps> = ({ evaluation }) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
  };

  return (
    <InfoSection>
      <Grid>
        <InfoCardComponent
          icon={<User size={20} />}
          label="Empleado"
          value={evaluation.employee ? 
            `${evaluation.employee.firstName} ${evaluation.employee.lastName}` :
            'Sin asignar'
          }
        />
        
        <InfoCardComponent
          icon={<User size={20} />}
          label="Evaluador"
          value={evaluation.evaluator ?
            `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}` :
            'Sin asignar'
          }
        />

        {evaluation.averageScore !== undefined && (
          <InfoCardComponent
            icon={<Star size={20} />}
            label="Puntuación"
            value={evaluation.averageScore.toFixed(1)}
          />
        )}

        {evaluation.deadline && (
          <InfoCardComponent
            icon={<Calendar size={20} />}
            label="Fecha límite"
            value={formatDate(evaluation.deadline)}
          />
        )}
      </Grid>
    </InfoSection>
  );
}; 