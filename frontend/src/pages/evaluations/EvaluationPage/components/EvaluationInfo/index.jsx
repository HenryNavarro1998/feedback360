import React from 'react';
import { InfoSection, Grid, InfoCard, Label, Value } from './styles';
import { EvaluationInfoProps } from './types';

export const EvaluationInfo = ({ evaluation }: EvaluationInfoProps) => {
  return (
    <InfoSection>
      <Grid>
        <InfoCard>
          <Label>Empleado Evaluado</Label>
          <Value>
            {`${evaluation?.employee?.firstName} ${evaluation?.employee?.lastName}` || 'No asignado'}
          </Value>
        </InfoCard>

        <InfoCard>
          <Label>Evaluador</Label>
          <Value>
            {`${evaluation?.evaluator?.firstName} ${evaluation?.evaluator?.lastName}` || 'No asignado'}
          </Value>
        </InfoCard>

        {evaluation?.overallScore !== undefined && (
          <InfoCard>
            <Label>Puntuación General</Label>
            <Value>{evaluation.overallScore.toFixed(2)}</Value>
          </InfoCard>
        )}

        <InfoCard>
          <Label>Fecha Límite</Label>
          <Value>
            {evaluation?.deadline 
              ? new Date(evaluation.deadline).toLocaleDateString()
              : 'No establecida'
            }
          </Value>
        </InfoCard>
      </Grid>
    </InfoSection>
  );
}; 