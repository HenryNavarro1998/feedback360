import { EvaluationModel } from '../../types';

export interface EvaluationModelsSectionProps {
  onEdit: (model: EvaluationModel) => void;
  onRefresh: () => void;
}

export interface ModelStats {
  totalQuestions: number;
  totalEvaluations: number;
  averageScore: number;
}

export interface ActionButtonProps {
  variant: 'edit' | 'delete';
} 