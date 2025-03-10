import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, PencilSimple, Trash } from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import evaluationService from '../../../services/evaluation.service';
import { Evaluation, EvaluationFilters } from './types';
import {
  PageContainer,
  Header,
  Title,
  FiltersContainer,
  FiltersGrid,
  FormGroup,
  Label,
  Select,
  Input,
  Button,
  Table,
  Th,
  Td,
  StatusBadge,
  ActionButton
} from './styles';

export const EvaluationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<EvaluationFilters>({});

  useEffect(() => {
    loadEvaluations();
  }, [filters]);

  const loadEvaluations = async () => {
    try {
      setLoading(true);
      const data = await evaluationService.getAllEvaluations(filters);
      setEvaluations(data);
    } catch (error) {
      console.error('Error al cargar evaluaciones:', error);
      toast.error('Error al cargar las evaluaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: keyof EvaluationFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value || undefined
    }));
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value ? new Date(value) : undefined
      }
    }));
  };

  const handleCreateEvaluation = () => {
    navigate('/evaluations/new');
  };

  const handleEditEvaluation = (id: string) => {
    navigate(`/evaluations/${id}/edit`);
  };

  const handleDeleteEvaluation = async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta evaluación?')) {
      return;
    }

    try {
      await evaluationService.deleteEvaluation(id);
      toast.success('Evaluación eliminada con éxito');
      loadEvaluations();
    } catch (error) {
      console.error('Error al eliminar evaluación:', error);
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

  return (
    <PageContainer>
      <Header>
        <Title>Evaluaciones</Title>
        <Button onClick={handleCreateEvaluation}>
          <Plus size={20} />
          Nueva Evaluación
        </Button>
      </Header>

      <FiltersContainer>
        <FiltersGrid>
          <FormGroup>
            <Label>Estado</Label>
            <Select
              value={filters.status || ''}
              onChange={e => handleFilterChange('status', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="draft">Borrador</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completada</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Fecha Inicio</Label>
            <Input
              type="date"
              value={filters.dateRange?.start?.toISOString().split('T')[0] || ''}
              onChange={e => handleDateRangeChange('start', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Fecha Fin</Label>
            <Input
              type="date"
              value={filters.dateRange?.end?.toISOString().split('T')[0] || ''}
              onChange={e => handleDateRangeChange('end', e.target.value)}
            />
          </FormGroup>
        </FiltersGrid>
      </FiltersContainer>

      <Table>
        <thead>
          <tr>
            <Th>Empleado</Th>
            <Th>Modelo</Th>
            <Th>Estado</Th>
            <Th>Fecha Creación</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map(evaluation => (
            <tr key={evaluation._id}>
              <Td>
                {evaluation.evaluatedEmployee.firstName} {evaluation.evaluatedEmployee.lastName}
              </Td>
              <Td>{evaluation.evaluationModel.name}</Td>
              <Td>
                <StatusBadge status={evaluation.status}>
                  {evaluation.status === 'draft' && 'Borrador'}
                  {evaluation.status === 'in_progress' && 'En Progreso'}
                  {evaluation.status === 'completed' && 'Completada'}
                </StatusBadge>
              </Td>
              <Td>{formatDate(evaluation.createdAt)}</Td>
              <Td>
                <ActionButton
                  onClick={() => handleEditEvaluation(evaluation._id)}
                  title="Editar"
                >
                  <PencilSimple size={20} />
                </ActionButton>
                <ActionButton
                  onClick={() => handleDeleteEvaluation(evaluation._id)}
                  title="Eliminar"
                >
                  <Trash size={20} />
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
}; 