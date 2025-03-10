import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pencil, Trash } from "@phosphor-icons/react";
import evaluationService from '../../../services/evaluation.service';
import { LoadingSpinner } from '../../../components/LoadingSpinner/index';

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ModelCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ModelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ModelTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
`;

const ModelDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ModelMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

const EvaluationModelsSection = ({ onEdit }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const data = await evaluationService.getAllEvaluationModels();
        setModels(data);
      } catch (err) {
        console.error('Error al cargar modelos:', err);
        setError(err.response?.data?.message || 'Error al cargar los modelos');
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: '#ef4444', padding: '1rem' }}>{error}</div>;

  return (
    <ModelsGrid>
      {models.map(model => (
        <ModelCard key={model._id}>
          <ModelHeader>
            <ModelTitle>{model.name}</ModelTitle>
            <ActionButtons>
              <IconButton onClick={() => onEdit(model)}>
                <Pencil size={20} />
              </IconButton>
              <IconButton>
                <Trash size={20} />
              </IconButton>
            </ActionButtons>
          </ModelHeader>
          <ModelDescription>{model.description}</ModelDescription>
          <ModelMeta>
            <span>{model.questions?.length || 0} preguntas</span>
          </ModelMeta>
        </ModelCard>
      ))}
    </ModelsGrid>
  );
};

export default EvaluationModelsSection; 