import React, { useState, useEffect } from 'react';
import { 
  PencilSimple, 
  Trash, 
  ListChecks,
  Users,
  Star
} from "@phosphor-icons/react";
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../../../../../components/LoadingSpinner/index';
import evaluationService from '../../../../../services/evaluation.service';
import { EvaluationModel } from '../../types';
import { EvaluationModelsSectionProps, ModelStats } from './types';
import {
  Grid,
  ModelCard,
  CardHeader,
  ModelInfo,
  ModelName,
  ModelDescription,
  Actions,
  ActionButton,
  Stats,
  StatItem
} from './styles';

export const EvaluationModelsSection: React.FC<EvaluationModelsSectionProps> = ({
  onEdit,
  onRefresh
}) => {
  const [models, setModels] = useState<EvaluationModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, ModelStats>>({});

  const loadModels = async () => {
    try {
      setLoading(true);
      const data = await evaluationService.getAllEvaluationModels();
      setModels(data);
      
      // Cargar estadísticas para cada modelo
      const statsData: Record<string, ModelStats> = {};
      for (const model of data) {
        const modelStats = await evaluationService.getModelStats(model._id);
        statsData[model._id] = modelStats;
      }
      setStats(statsData);
    } catch (error) {
      console.error('Error al cargar los modelos:', error);
      toast.error('Error al cargar los modelos de evaluación');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handleDelete = async (modelId: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este modelo?')) {
      try {
        await evaluationService.deleteEvaluationModel(modelId);
        toast.success('Modelo eliminado exitosamente');
        loadModels();
        onRefresh();
      } catch (error) {
        console.error('Error al eliminar el modelo:', error);
        toast.error('Error al eliminar el modelo');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Grid>
      {models.map(model => (
        <ModelCard key={model._id}>
          <CardHeader>
            <ModelInfo>
              <ModelName>{model.name}</ModelName>
              <ModelDescription>{model.description}</ModelDescription>
            </ModelInfo>
            <Actions>
              <ActionButton 
                variant="edit" 
                onClick={() => onEdit(model)}
                title="Editar modelo"
              >
                <PencilSimple size={20} />
              </ActionButton>
              <ActionButton 
                variant="delete" 
                onClick={() => handleDelete(model._id)}
                title="Eliminar modelo"
              >
                <Trash size={20} />
              </ActionButton>
            </Actions>
          </CardHeader>

          <Stats>
            <StatItem>
              <ListChecks size={20} />
              {stats[model._id]?.totalQuestions || 0} preguntas
            </StatItem>
            <StatItem>
              <Users size={20} />
              {stats[model._id]?.totalEvaluations || 0} evaluaciones
            </StatItem>
            <StatItem>
              <Star size={20} />
              {stats[model._id]?.averageScore?.toFixed(1) || 0} promedio
            </StatItem>
          </Stats>
        </ModelCard>
      ))}
    </Grid>
  );
}; 