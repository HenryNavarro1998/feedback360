import { Employee } from '../../../pages/evaluations/EvaluationsPage/types';
import { EvaluationModel } from '../EvaluationModelFormModal/types';
import { Participant } from '../EvaluationResponse/types';

export interface Evaluation {
  _id?: string;
  description: string;
  evaluatedEmployee: Employee | string;
  evaluationModel: EvaluationModel | string;
  participants: Participant[];
  status: 'draft' | 'in_progress' | 'completed';
}

export interface FormData {
  description: string;
  evaluatedEmployee: string;
  evaluationModel: string;
  participants: Participant[];
  status: 'draft' | 'in_progress' | 'completed';
}

export interface EvaluationFormProps {
  evaluation?: Evaluation;
  onSave: (data: FormData) => Promise<boolean>;
  onCancel: () => void;
} 