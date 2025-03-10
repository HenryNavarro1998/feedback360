export interface EvaluationActionsProps {
  evaluationId: string;
  status: 'draft' | 'in_progress' | 'completed';
}

export interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
} 