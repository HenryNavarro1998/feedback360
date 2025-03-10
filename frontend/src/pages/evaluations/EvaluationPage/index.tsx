import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock,
  PencilSimple,
  Trash
} from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { EvaluationResponse } from '../../../components/evaluations/EvaluationResponse';
import evaluationService from '../../../services/evaluation.service';
import { Evaluation, EvaluationPageProps, Participant } from './types';
import {
  PageContainer,
  Header,
  Title,
  Section,
  SectionTitle,
  StatusBadge,
  Grid,
  InfoGroup,
  Label,
  Value,
  ButtonsContainer,
  Button,
  ParticipantsList,
  ParticipantCard,
  ParticipantName,
  ParticipantRole,
  CompletionStatus
} from './styles';

export const EvaluationPage: React.FC<EvaluationPageProps> = ({
  mode = 'view',
  evaluationId
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id || evaluationId) {
      loadEvaluation(id || evaluationId!);
    }
  }, [id, evaluationId]);

  const loadEvaluation = async (evalId: string) => {
    try {
      setLoading(true);
      const data = await evaluationService.getEvaluationById(evalId);
      setEvaluation(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar la evaluación:', err);
      setError('Error al cargar los datos de la evaluación');
    } finally {
      setLoading(false);
    }
  };

  const handleStartEvaluation = async () => {
    if (!evaluation) return;

    try {
      await evaluationService.updateEvaluation(evaluation._id, {
        ...evaluation,
        status: 'in_progress'
      });
      toast.success('Evaluación iniciada exitosamente');
      loadEvaluation(evaluation._id);
    } catch (err) {
      console.error('Error al iniciar la evaluación:', err);
      toast.error('Error al iniciar la evaluación');
    }
  };

  const handleSubmitResponse = async (data: { answers: Record<string, string>; comments: string }) => {
    if (!evaluation || !selectedParticipant) return;

    try {
      const updatedParticipants = evaluation.participants.map(p => 
        p.employee._id === selectedParticipant.employee._id
          ? { ...p, ...data, completed: true }
          : p
      );

      await evaluationService.updateEvaluation(evaluation._id, {
        ...evaluation,
        participants: updatedParticipants,
        status: updatedParticipants.every(p => p.completed) ? 'completed' : 'in_progress'
      });

      toast.success('Respuestas guardadas exitosamente');
      setSelectedParticipant(null);
      loadEvaluation(evaluation._id);
    } catch (err) {
      console.error('Error al guardar las respuestas:', err);
      toast.error('Error al guardar las respuestas');
    }
  };

  const handleDeleteEvaluation = async () => {
    if (!evaluation) return;

    if (!window.confirm('¿Está seguro de que desea eliminar esta evaluación?')) {
      return;
    }

    try {
      await evaluationService.deleteEvaluation(evaluation._id);
      toast.success('Evaluación eliminada exitosamente');
      navigate('/evaluations');
    } catch (err) {
      console.error('Error al eliminar la evaluación:', err);
      toast.error('Error al eliminar la evaluación');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!evaluation) return <div>No se encontró la evaluación</div>;

  return (
    <PageContainer>
      <Header>
        <Button variant="secondary" onClick={() => navigate('/evaluations')}>
          <ArrowLeft size={20} />
          Volver
        </Button>
        <Title>
          Evaluación de {evaluation.evaluatedEmployee.firstName} {evaluation.evaluatedEmployee.lastName}
        </Title>
        <StatusBadge status={evaluation.status}>
          {evaluation.status === 'draft' && 'Borrador'}
          {evaluation.status === 'in_progress' && 'En Progreso'}
          {evaluation.status === 'completed' && 'Completada'}
        </StatusBadge>
      </Header>

      <Section>
        <SectionTitle>Información General</SectionTitle>
        <Grid>
          <InfoGroup>
            <Label>Empleado Evaluado</Label>
            <Value>
              {evaluation.evaluatedEmployee.firstName} {evaluation.evaluatedEmployee.lastName}
            </Value>
          </InfoGroup>
          <InfoGroup>
            <Label>Modelo de Evaluación</Label>
            <Value>{evaluation.evaluationModel.name}</Value>
          </InfoGroup>
          <InfoGroup>
            <Label>Fecha de Creación</Label>
            <Value>{formatDate(evaluation.createdAt)}</Value>
          </InfoGroup>
          <InfoGroup>
            <Label>Última Actualización</Label>
            <Value>{formatDate(evaluation.updatedAt)}</Value>
          </InfoGroup>
        </Grid>

        {evaluation.description && (
          <InfoGroup>
            <Label>Descripción</Label>
            <Value>{evaluation.description}</Value>
          </InfoGroup>
        )}
      </Section>

      <Section>
        <SectionTitle>Participantes</SectionTitle>
        <ParticipantsList>
          {evaluation.participants.map(participant => (
            <ParticipantCard key={participant.employee._id}>
              <ParticipantName>
                {participant.employee.firstName} {participant.employee.lastName}
              </ParticipantName>
              <ParticipantRole>{participant.role}</ParticipantRole>
              <CompletionStatus completed={participant.completed}>
                {participant.completed ? (
                  <>
                    <CheckCircle size={16} />
                    Completado
                  </>
                ) : (
                  <>
                    <Clock size={16} />
                    Pendiente
                  </>
                )}
              </CompletionStatus>
            </ParticipantCard>
          ))}
        </ParticipantsList>
      </Section>

      <ButtonsContainer>
        {evaluation.status === 'draft' && (
          <>
            <Button onClick={handleStartEvaluation}>
              Iniciar Evaluación
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate(`/evaluations/${evaluation._id}/edit`)}
            >
              <PencilSimple size={20} />
              Editar
            </Button>
            <Button 
              variant="danger"
              onClick={handleDeleteEvaluation}
            >
              <Trash size={20} />
              Eliminar
            </Button>
          </>
        )}
      </ButtonsContainer>

      {selectedParticipant && (
        <EvaluationResponse
          evaluation={evaluation}
          participant={selectedParticipant}
          readOnly={selectedParticipant.completed}
          onSubmit={handleSubmitResponse}
          onClose={() => setSelectedParticipant(null)}
        />
      )}
    </PageContainer>
  );
}; 