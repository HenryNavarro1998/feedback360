import { Evaluation } from '../../../EvaluationsPage/types';

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface EvaluationInfoProps {
  evaluation: Evaluation;
}

export interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
} 