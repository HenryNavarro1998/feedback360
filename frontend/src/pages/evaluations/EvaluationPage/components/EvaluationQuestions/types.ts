import { Question, EvaluationResponse } from '../../../EvaluationsPage/types';

interface Option {
  _id: string;
  text: string;
  score: number;
}

interface Question {
  _id: string;
  text: string;
  options: Option[];
}

interface Answer {
  option: string;
  score: number;
}

export interface Answers {
  [questionId: string]: Answer;
}

export interface UseQuestionsProps {
  questions: Question[];
  onSubmit: (answers: Answers) => void;
}

export interface EvaluationQuestionsProps {
  questions: Question[];
  onSubmit: (responses: EvaluationResponse[]) => Promise<void>;
  isCompleted: boolean;
}

export interface QuestionState {
  questionId: string;
  selectedOptionId: string | null;
  score: number;
}

export interface UseQuestionsReturn {
  answers: QuestionState[];
  handleAnswerChange: (questionId: string, optionId: string, score: number) => void;
  handleSubmit: () => Promise<void>;
  isAllAnswered: boolean;
} 