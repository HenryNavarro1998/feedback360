interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface EvaluationInfoProps {
  evaluation: {
    employee?: Employee;
    evaluator?: Employee;
    overallScore?: number;
    deadline?: string;
  };
} 