import { useState, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Question, EvaluationResponse } from '../../../../EvaluationsPage/types';
import { QuestionState, UseQuestionsReturn } from '../types';

export const useQuestions = (
  questions: Question[],
  onSubmit: (responses: EvaluationResponse[]) => Promise<void>,
  isCompleted: boolean
): UseQuestionsReturn => {
  const [answers, setAnswers] = useState<QuestionState[]>([]);

  const handleAnswerChange = useCallback((questionId: string, optionId: string, score: number) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = {
          questionId,
          selectedOptionId: optionId,
          score
        };
        return newAnswers;
      }

      return [...prev, {
        questionId,
        selectedOptionId: optionId,
        score
      }];
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const responses: EvaluationResponse[] = answers.map(answer => ({
      questionId: answer.questionId,
      optionId: answer.selectedOptionId!,
      score: answer.score
    }));

    await onSubmit(responses);
  }, [answers, onSubmit]);

  const isAllAnswered = useMemo(() => {
    return questions.length > 0 && answers.length === questions.length;
  }, [questions, answers]);

  return {
    answers,
    handleAnswerChange,
    handleSubmit,
    isAllAnswered
  };
}; 