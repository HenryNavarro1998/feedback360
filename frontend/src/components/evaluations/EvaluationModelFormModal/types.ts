import { EvaluationModel } from '../../../pages/evaluations/EvaluationsPage/types';

export interface EvaluationModelFormModalProps {
  model?: EvaluationModel | null;
  onClose: () => void;
  onSave: (data: Partial<EvaluationModel>) => Promise<void>;
}

export interface FormData {
  name: string;
  description: string;
  questions: {
    text: string;
    options: {
      text: string;
      score: number;
    }[];
  }[];
}

export interface QuestionFieldProps {
  index: number;
  onRemove: () => void;
}

export interface OptionFieldProps {
  questionIndex: number;
  optionIndex: number;
  onRemove: () => void;
} 