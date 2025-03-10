import { Employee } from '../../../pages/evaluations/EvaluationsPage/types';

export interface Participant {
  employee: Employee;
  role: 'evaluator';
}

export interface ParticipantsEditorProps {
  participants: Participant[];
  onChange: (participants: Participant[]) => void;
  evaluatedEmployeeId: string;
}

export interface ParticipantCardProps {
  participant: Participant;
  onRemove: () => void;
} 