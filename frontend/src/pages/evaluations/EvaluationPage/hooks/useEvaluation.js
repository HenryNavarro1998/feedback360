import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import evaluationService from '../../../../services/evaluation.service';

export const useEvaluation = (evaluationId) => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const data = await evaluationService.getEvaluation(evaluationId);
        setEvaluation(data);
      } catch (error) {
        console.error('Error fetching evaluation:', error);
        toast.error('Error al cargar la evaluación');
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [evaluationId]);

  const handleSubmitResponse = async (responses) => {
    try {
      setLoading(true);
      await evaluationService.submitResponse(evaluationId, responses);
      const updatedEvaluation = await evaluationService.getEvaluation(evaluationId);
      setEvaluation(updatedEvaluation);
      toast.success('Respuestas guardadas exitosamente');
    } catch (error) {
      console.error('Error submitting responses:', error);
      toast.error('Error al guardar las respuestas');
    } finally {
      setLoading(false);
    }
  };

  return {
    evaluation,
    loading,
    handleSubmitResponse
  };
}; 