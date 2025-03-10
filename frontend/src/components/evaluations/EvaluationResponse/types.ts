import { Employee } from '../../../pages/evaluations/EvaluationsPage/types';

export interface Option {
  _id: string;
  option: string;
  score: number;
}

export interface Question {
  _id: string;
  question: string;
  options: Option[];
}

export interface EvaluationModel {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Evaluation {
  _id: string;
  evaluationModel: EvaluationModel;
}

export interface Participant {
  employee: Employee;
  answers?: Record<string, string>;
  comments?: string;
}

export interface EvaluationResponseProps {
  evaluation: Evaluation;
  participant?: Participant;
  readOnly?: boolean;
  onSubmit: (data: { answers: Record<string, string>; comments: string }) => void;
  onClose: () => void;
} 