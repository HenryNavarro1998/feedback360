import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Trash,
  FilePdf
} from "@phosphor-icons/react";
import { toast } from 'react-hot-toast';
import evaluationService from '../../../../../services/evaluation.service';
import { EvaluationActionsProps } from './types';
import {
  ActionsContainer,
  ActionButton
} from './styles';

export const EvaluationActions: React.FC<EvaluationActionsProps> = ({
  evaluationId,
  status
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar esta evaluación?')) {
      try {
        await evaluationService.deleteEvaluation(evaluationId);
        toast.success('Evaluación eliminada exitosamente');
        navigate('/evaluations');
      } catch (error) {
        console.error('Error al eliminar la evaluación:', error);
        toast.error('Error al eliminar la evaluación');
      }
    }
  };

  const handleExportPDF = async () => {
    try {
      await evaluationService.exportEvaluationToPDF(evaluationId);
      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      toast.error('Error al generar el PDF');
    }
  };

  return (
    <ActionsContainer>
      <ActionButton
        variant="secondary"
        onClick={() => navigate('/evaluations')}
      >
        <ArrowLeft size={20} />
        Volver
      </ActionButton>

      {status === 'completed' && (
        <ActionButton
          variant="primary"
          onClick={handleExportPDF}
        >
          <FilePdf size={20} />
          Exportar PDF
        </ActionButton>
      )}

      <ActionButton
        variant="danger"
        onClick={handleDelete}
      >
        <Trash size={20} />
        Eliminar
      </ActionButton>
    </ActionsContainer>
  );
}; 