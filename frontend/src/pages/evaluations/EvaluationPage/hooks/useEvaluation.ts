import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import evaluationService from '../../../../services/evaluation.service';
import { EvaluationPageState, EvaluationResponse } from '../types';

export const useEvaluation = (id: string) => {
  const [state, setState] = useState<EvaluationPageState>({
    evaluation: null,
    loading: true,
    error: null
  });

  const loadEvaluation = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const data = await evaluationService.getEvaluationById(id);
      setState(prev => ({
        ...prev,
        evaluation: data,
        loading: false
      }));
    } catch (error) {
      console.error('Error al cargar la evaluación:', error);
      setState(prev => ({
        ...prev,
        error: 'Error al cargar la evaluación',
        loading: false
      }));
      toast.error('Error al cargar la evaluación');
    }
  };

  const handleSubmitResponse = async (responses: EvaluationResponse[]) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await evaluationService.submitEvaluationResponses(id, {
        responses,
        status: responses.length === state.evaluation?.evaluationModel.questions.length ? 
          'completed' : 'in_progress'
      });
      
      toast.success('Respuestas guardadas exitosamente');
      await loadEvaluation();
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      toast.error('Error al guardar las respuestas');
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadEvaluation();
  }, [id]);

  return {
    ...state,
    handleSubmitResponse
  };
}; 