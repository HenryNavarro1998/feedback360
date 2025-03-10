export interface EvaluationHeaderProps {
  title: string;
  status: 'draft' | 'in_progress' | 'completed';
}

export interface StatusBadgeProps {
  status: 'draft' | 'in_progress' | 'completed';
} 