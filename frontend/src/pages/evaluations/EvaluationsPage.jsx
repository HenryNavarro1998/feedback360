import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  ListChecks, 
  ClipboardText,
  User,
  Calendar,
  CheckCircle,
  Clock,
  Warning,
  CaretRight
} from "@phosphor-icons/react";
import EvaluationModelsSection from './sections/EvaluationModelsSection';
import EvaluationsSection from './sections/EvaluationsSection';
import EvaluationModelFormModal from '../../components/evaluations/EvaluationModelFormModal';
import { useNavigate } from 'react-router-dom';
import evaluationService from '../../services/evaluation.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.active ? `
    background: #2563eb;
    color: white;
  ` : `
    background: #f1f5f9;
    color: #64748b;
  `}

  &:hover {
    background: ${props => props.active ? '#1d4ed8' : '#e2e8f0'};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const EvaluationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EvaluationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EvaluationCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const ModelName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const EmployeeName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;

  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case 'in_progress':
        return `
          background: #fef9c3;
          color: #ca8a04;
        `;
      default:
        return `
          background: #f1f5f9;
          color: #64748b;
        `;
    }
  }}
`;

const ParticipantsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: #e2e8f0;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #2563eb;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #1e293b;
  }
`;

const EvaluationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('models');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [error, setError] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSaveModel = async (modelData) => {
    try {
      let response;
      if (selectedModel) {
        // Si hay un modelo seleccionado, actualizamos
        response = await evaluationService.updateEvaluationModel(selectedModel._id, modelData);
      } else {
        // Si no hay modelo seleccionado, creamos uno nuevo
        response = await evaluationService.createEvaluationModel(modelData);
      }

      setIsModalOpen(false);
      setSelectedModel(null);

      // Recargar la lista de modelos
      if (activeTab === 'models') {
        const updatedModels = await evaluationService.getAllEvaluationModels();
        // Actualizar el estado de los modelos en EvaluationModelsSection
        // Puedes usar un callback o un contexto para esto
      }

      // Mostrar mensaje de éxito
      alert(selectedModel ? 'Modelo actualizado exitosamente' : 'Modelo creado exitosamente');
    } catch (err) {
      console.error('Error al guardar el modelo:', err);
      setError(err.response?.data?.message || 'Error al guardar el modelo');
    }
  };

  const handleEditModel = (model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'evaluations') {
          const data = await evaluationService.getAllEvaluations();
          setEvaluations(data);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.response?.data?.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  const getProgressPercentage = (evaluation) => {
    if (!evaluation?.participants?.length) return 0;
    
    const completed = evaluation.participants.filter(p => p.status === 'completed').length;
    const total = evaluation.participants.length;
    return Math.round((completed / total) * 100);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PageContainer>
      <Header>
        <Title>Evaluaciones</Title>
        <AddButton onClick={() => {
          if (activeTab === 'models') {
            setSelectedModel(null);
            setIsModalOpen(true);
          } else {
            navigate('/evaluations/new');
          }
        }}>
          <Plus size={20} />
          {activeTab === 'models' ? 'Nuevo Modelo' : 'Nueva Evaluación'}
        </AddButton>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === 'models'} 
          onClick={() => setActiveTab('models')}
        >
          <ListChecks size={20} />
          Modelos de Evaluación
        </Tab>
        <Tab 
          active={activeTab === 'evaluations'} 
          onClick={() => setActiveTab('evaluations')}
        >
          <ClipboardText size={20} />
          Evaluaciones
        </Tab>
      </TabsContainer>

      {activeTab === 'models' ? (
        <EvaluationModelsSection onEdit={handleEditModel} />
      ) : (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div style={{ color: '#ef4444', padding: '1rem' }}>{error}</div>
          ) : (
            <EvaluationsGrid>
              {evaluations.map(evaluation => (
                <EvaluationCard 
                  key={evaluation._id}
                  onClick={() => navigate(`/evaluations/${evaluation._id}`)}
                >
                  <CardHeader>
                    <ModelName>
                      {evaluation.evaluationModel?.name || 'Modelo sin nombre'}
                    </ModelName>
                    <EmployeeName>
                      <User size={20} />
                      {evaluation.employee ? 
                        `${evaluation.employee.firstName} ${evaluation.employee.lastName}` :
                        'Empleado sin asignar'
                      }
                    </EmployeeName>
                  </CardHeader>

                  <StatusBadge status={evaluation.status || 'draft'}>
                    {evaluation.status === 'completed' ? (
                      <>
                        <CheckCircle size={20} />
                        Completada
                      </>
                    ) : evaluation.status === 'in_progress' ? (
                      <>
                        <Clock size={20} />
                        En Progreso
                      </>
                    ) : (
                      <>
                        <Clock size={20} />
                        Borrador
                      </>
                    )}
                  </StatusBadge>

                  {/* <Progress>
                    <span>Progreso</span>
                    <span>{getProgressPercentage(evaluation)}%</span>
                  </Progress>
                  <ProgressBar>
                    <ProgressFill progress={getProgressPercentage(evaluation)} />
                  </ProgressBar> */}

                  <ViewButton>
                    Ver Evaluación
                    <CaretRight size={20} />
                  </ViewButton>
                </EvaluationCard>
              ))}
            </EvaluationsGrid>
          )}
        </>
      )}

      {isModalOpen && activeTab === 'models' && (
        <EvaluationModelFormModal
          model={selectedModel}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedModel(null);
          }}
          onSave={handleSaveModel}
        />
      )}
    </PageContainer>
  );
};

export default EvaluationsPage; 