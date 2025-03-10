import { Evaluation } from '../../types';

export interface EvaluationsSectionProps {
  evaluations: Evaluation[];
  onNavigate: (id: string) => void;
}

export interface StatusBadgeProps {
  status: 'completed' | 'in_progress' | 'draft';
}

export interface ProgressFillProps {
  progress: number;
}

export interface EvaluationStats {
  totalQuestions: number;
  completedQuestions: number;
  averageScore: number;
}

export interface StatusConfig {
  label: string;
  icon: React.FC;
  color: string;
} 