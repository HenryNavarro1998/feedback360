import { Employee } from '../EvaluationsPage/types';
import { EvaluationModel } from '../../../components/evaluations/EvaluationModelFormModal/types';

export interface Participant {
  employee: Employee;
  role: 'evaluator';
  answers?: Record<string, string>;
  comments?: string;
  completed?: boolean;
}

export interface Evaluation {
  _id: string;
  description: string;
  evaluatedEmployee: Employee;
  evaluationModel: EvaluationModel;
  participants: Participant[];
  status: 'draft' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationPageProps {
  mode?: 'create' | 'edit' | 'view';
  evaluationId?: string;
}

export interface EvaluationFormData {
  description: string;
  evaluatedEmployee: string;
  evaluationModel: string;
  participants: Participant[];
  status: 'draft' | 'in_progress' | 'completed';
}

export interface EvaluationPageState {
  evaluation: Evaluation | null;
  loading: boolean;
  error: string | null;
}

export interface EvaluationResponse {
  questionId: string;
  optionId: string;
  score: number;
}

export interface EvaluationSubmitData {
  responses: EvaluationResponse[];
  status: 'completed' | 'in_progress' | 'draft';
}

export { Evaluation }; 