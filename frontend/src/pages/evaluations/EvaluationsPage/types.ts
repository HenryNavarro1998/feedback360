export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  status: 'active' | 'inactive';
}

export interface Option {
  _id: string;
  text: string;
  score: number;
}

export interface Question {
  _id: string;
  text: string;
  options: Option[];
}

export interface EvaluationModel {
  _id: string;
  name: string;
  description: string;
  questions: Array<{
    _id: string;
    question: string;
    options: Array<{
      _id: string;
      option: string;
      score: number;
    }>;
  }>;
}

export interface Response {
  questionId: string;
  optionId: string;
  score: number;
}

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

export interface EvaluationsPageState {
  activeTab: 'models' | 'evaluations';
  isModalOpen: boolean;
  selectedModel: EvaluationModel | null;
  error: string | null;
  evaluations: Evaluation[];
  loading: boolean;
}

export interface EvaluationFilters {
  status?: string;
  employee?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
} 