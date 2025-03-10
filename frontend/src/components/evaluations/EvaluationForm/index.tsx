import React, { useState, useEffect } from 'react';
import { ParticipantsEditor } from '../ParticipantsEditor';
import { LoadingSpinner } from '../../LoadingSpinner';
import employeeService from '../../../services/employee.service';
import evaluationModelService from '../../../services/evaluation-model.service';
import { EvaluationFormProps, FormData } from './types';
import { Employee } from '../../../pages/evaluations/EvaluationsPage/types';
import { EvaluationModel } from '../EvaluationModelFormModal/types';
import {
  FormContainer,
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Select,
  Button,
  PreviewSection,
  QuestionPreview,
  QuestionText,
  OptionsGroup,
  OptionLabel,
  ErrorMessage
} from './styles';

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  evaluation,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<FormData>({
    description: evaluation?.description || '',
    evaluatedEmployee: typeof evaluation?.evaluatedEmployee === 'string' 
      ? evaluation.evaluatedEmployee 
      : evaluation?.evaluatedEmployee?._id || '',
    evaluationModel: typeof evaluation?.evaluationModel === 'string'
      ? evaluation.evaluationModel
      : evaluation?.evaluationModel?._id || '',
    participants: evaluation?.participants || [],
    status: evaluation?.status || 'draft'
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [evaluationModels, setEvaluationModels] = useState<EvaluationModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<EvaluationModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (evaluation) {
      setFormData({
        description: evaluation.description || '',
        evaluatedEmployee: typeof evaluation.evaluatedEmployee === 'string'
          ? evaluation.evaluatedEmployee
          : evaluation.evaluatedEmployee?._id || '',
        evaluationModel: typeof evaluation.evaluationModel === 'string'
          ? evaluation.evaluationModel
          : evaluation.evaluationModel?._id || '',
        participants: evaluation.participants || [],
        status: evaluation.status || 'draft'
      });
    }
  }, [evaluation]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [employeesData, modelsData] = await Promise.all([
        employeeService.getAllEmployees(),
        evaluationModelService.getAllModels()
      ]);
      setEmployees(employeesData);
      setEvaluationModels(modelsData);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos iniciales:', err);
      setError('Error al cargar los datos necesarios');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'evaluatedEmployee' ? { participants: [] } : {})
    }));
  };

  const handleParticipantsChange = (newParticipants: FormData['participants']) => {
    setFormData(prev => ({
      ...prev,
      participants: newParticipants
    }));
  };

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value;
    setFormData(prev => ({
      ...prev,
      evaluationModel: modelId
    }));

    if (modelId) {
      try {
        const model = evaluationModels.find(m => m._id === modelId);
        setSelectedModel(model || null);
      } catch (err) {
        console.error('Error al obtener el modelo:', err);
        setError('Error al cargar el modelo de evaluación');
      }
    } else {
      setSelectedModel(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSave(formData);
    if (success && !evaluation) {
      setFormData({
        description: '',
        evaluatedEmployee: '',
        evaluationModel: '',
        participants: [],
        status: 'draft'
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Section>
        <SectionTitle>Información Básica</SectionTitle>
        <FormGroup>
          <Label>Empleado a Evaluar</Label>
          <Select
            name="evaluatedEmployee"
            value={formData.evaluatedEmployee}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un empleado</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Modelo de Evaluación</Label>
          <Select
            name="evaluationModel"
            value={formData.evaluationModel}
            onChange={handleModelChange}
            required
          >
            <option value="">Seleccione un modelo</option>
            {evaluationModels.map(model => (
              <option key={model._id} value={model._id}>
                {model.name}
              </option>
            ))}
          </Select>
        </FormGroup>
      </Section>

      {formData.evaluatedEmployee && (
        <Section>
          <SectionTitle>Participantes</SectionTitle>
          <ParticipantsEditor
            participants={formData.participants}
            onChange={handleParticipantsChange}
            evaluatedEmployeeId={formData.evaluatedEmployee}
          />
        </Section>
      )}

      {selectedModel && (
        <PreviewSection>
          <SectionTitle>Vista Previa del Modelo</SectionTitle>
          {selectedModel.questions.map((question, index) => (
            <QuestionPreview key={question._id}>
              <QuestionText>
                {`${index + 1}. ${question.question}`}
              </QuestionText>
              <OptionsGroup>
                {question.options.map(option => (
                  <OptionLabel key={option._id}>
                    {option.option} ({option.score} puntos)
                  </OptionLabel>
                ))}
              </OptionsGroup>
            </QuestionPreview>
          ))}
        </PreviewSection>
      )}

      <Section>
        <Button type="submit">
          {evaluation ? 'Actualizar' : 'Crear'} Evaluación
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </Section>
    </FormContainer>
  );
}; 