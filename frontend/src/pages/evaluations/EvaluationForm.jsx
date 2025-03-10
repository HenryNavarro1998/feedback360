import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ParticipantsEditor from '../../components/evaluations/ParticipantsEditor';
import employeeService from '../../services/employee.service';
import evaluationModelService from '../../services/evaluation-model.service';
import LoadingSpinner from '../../components/LoadingSpinner';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const PreviewSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const QuestionPreview = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const QuestionText = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const EvaluationForm = ({ evaluation, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    description: evaluation?.description || '',
    evaluatedEmployee: evaluation?.evaluatedEmployee?._id || '',
    evaluationModel: evaluation?.evaluationModel?._id || '',
    participants: evaluation?.participants || [],
    status: evaluation?.status || 'draft'
  });
  const [employees, setEmployees] = useState([]);
  const [evaluationModels, setEvaluationModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (evaluation) {
      setFormData({
        description: evaluation.description || '',
        evaluatedEmployee: evaluation.evaluatedEmployee?._id || '',
        evaluationModel: evaluation.evaluationModel?._id || '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Si se cambia el empleado evaluado, limpiamos los participantes
      ...(name === 'evaluatedEmployee' ? { participants: [] } : {})
    }));
  };

  const handleParticipantsChange = (newParticipants) => {
    setFormData(prev => ({
      ...prev,
      participants: newParticipants
    }));
  };

  const handleModelChange = async (e) => {
    const modelId = e.target.value;
    setFormData(prev => ({
      ...prev,
      evaluationModel: modelId
    }));

    if (modelId) {
      try {
        // Obtener el modelo completo cuando se selecciona
        const model = evaluationModels.find(m => m._id === modelId);
        setSelectedModel(model);
      } catch (err) {
        console.error('Error al obtener el modelo:', err);
        setError('Error al cargar el modelo de evaluación');
      }
    } else {
      setSelectedModel(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(formData);
    // Solo limpiamos el formulario si la operación fue exitosa
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
  if (error) return <div style={{ color: '#ef4444', padding: '1rem' }}>{error}</div>;

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
                {`${employee.firstName} ${employee.lastName}`}
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
          <SectionTitle>Vista Previa del Cuestionario</SectionTitle>
          {selectedModel.questions?.map((question, index) => (
            <QuestionPreview key={index}>
              <QuestionText>{`${index + 1}. ${question.text}`}</QuestionText>
              <OptionsGroup>
                {question.options?.map((option, optIndex) => (
                  <OptionLabel key={optIndex}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option._id}
                      disabled
                    />
                    <span>{option.text}</span>
                  </OptionLabel>
                ))}
              </OptionsGroup>
            </QuestionPreview>
          ))}
        </PreviewSection>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {evaluation ? 'Actualizar' : 'Crear'} Evaluación
        </Button>
      </div>
    </FormContainer>
  );
};

export default EvaluationForm; 