import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import evaluationService from '../../services/evaluation.service';

const PageContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Status = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${({ status }) => {
    switch (status) {
      case 'pending':
        return 'background-color: #fef3c7; color: #92400e;';
      case 'in_progress':
        return 'background-color: #dbeafe; color: #1e40af;';
      case 'completed':
        return 'background-color: #dcfce7; color: #166534;';
      default:
        return 'background-color: #f3f4f6; color: #374151;';
    }
  }}
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
`;

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ParticipantCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const QuestionsSection = styled(InfoCard)`
  h2 {
    color: #1e293b;
    margin-bottom: 1.5rem;
  }
`;

const QuestionCard = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Question = styled.p`
  color: #1e293b;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  text-align: left;
  background: ${props => props.isSelected ? '#e0e7ff' : 'white'};
  border: 1px solid ${props => props.isSelected ? '#6366f1' : '#e2e8f0'};
  border-radius: 0.375rem;
  color: ${props => props.isSelected ? '#4f46e5' : '#1e293b'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isSelected ? '#e0e7ff' : '#f1f5f9'};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #4f46e5;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const StyledSelect = styled(Select)`
  .select__control {
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    min-height: 42px;
    box-shadow: none;

    &:hover {
      border-color: #94a3b8;
    }

    &--is-focused {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
    }
  }

  .select__menu {
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .select__option {
    padding: 0.75rem;
    cursor: pointer;

    &--is-focused {
      background-color: #f1f5f9;
    }

    &--is-selected {
      background-color: #6366f1;
      color: white;
    }
  }

  .select__multi-value {
    background-color: #e0e7ff;
    border-radius: 0.25rem;

    &__label {
      color: #4f46e5;
    }

    &__remove {
      color: #4f46e5;
      
      &:hover {
        background-color: #c7d2fe;
        color: #4338ca;
      }
    }
  }

  .select__placeholder {
    color: #94a3b8;
  }
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-family: inherit;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .react-datepicker__current-month {
    color: #1e293b;
    font-weight: 600;
  }

  .react-datepicker__day {
    color: #475569;
    border-radius: 0.25rem;

    &:hover {
      background-color: #f1f5f9;
    }

    &--selected {
      background-color: #6366f1;
      color: white;

      &:hover {
        background-color: #4f46e5;
      }
    }

    &--in-range {
      background-color: #e0e7ff;
      color: #4f46e5;
    }

    &--keyboard-selected {
      background-color: #e0e7ff;
      color: #4f46e5;
    }
  }
`;

const PreviewSection = styled(Section)`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.3s ease-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const QuestionPreview = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PreviewQuestion = styled.div`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const RadioOptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const RadioInput = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  margin-right: 0.75rem;
  position: relative;
  cursor: pointer;

  &:checked {
    border-color: #6366f1;
    background-color: #6366f1;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 50%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const OptionText = styled.span`
  color: #1e293b;
  font-size: 0.875rem;
`;

const EvaluationPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [evaluationModels, setEvaluationModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({
    evaluationModel: null,
    employee: null,
  });
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question, option, score) => {
    if (answers[question]) {
      setAnswers({
        ...answers,
        [question]: {
          option,
          score
        }
      });
    } else {
      setAnswers({
        ...answers,
        [question]: { option, score }
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await evaluationService.getEvaluation(id);
          console.log(data);
          setEvaluation(data);
        } else {
          const [employeesData, modelsData] = await Promise.all([
            evaluationService.getAvailableEmployees(),
            evaluationService.getAllEvaluationModels()
          ]);

          // console.log('Modelos cargados:', modelsData); // Debug

          // Transformar modelos para el select manteniendo toda la información
          const modelOptions = modelsData.map(model => ({
            value: model._id,
            label: model.name,
            // Guardar el modelo completo
            model: model
          }));

          setEvaluationModels(modelOptions);
          setEmployees(employeesData.map(emp => ({
            value: emp._id,
            label: `${emp.firstName} ${emp.lastName}`,
            position: emp.position
          })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleModelChange = (selected) => {
    console.log('Modelo seleccionado:', selected);
    setSelectedModel(selected?.model || null);
    setFormData(prev => ({
      ...prev,
      evaluationModel: selected
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (id && !evaluation) {
    return <div>No se encontró la evaluación</div>;
  }

  // Si no hay ID, mostrar formulario de creación
  if (!id) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.evaluationModel || !formData.evaluatedEmployee || !formData.participants.length) {
        toast.error('Por favor complete todos los campos requeridos');
        return;
      }

      try {
        const evaluationData = {
          evaluationModel: formData.evaluationModel.value,
          evaluatedEmployee: formData.evaluatedEmployee.value,
          evaluatedBy: user.employee._id,
          employees: formData.participants.map(p => p.value)
        };

        console.log('Datos a enviar:', evaluationData); // Debug

        
        await evaluationService.createEvaluation(evaluationData);


        toast.success('Evaluación creada exitosamente');
        navigate('/evaluations');
      } catch (error) {
        console.error('Error creating evaluation:', error);
        toast.error(error.response?.data?.message || 'Error al crear la evaluación');
      }
    };

    return (
      <PageContainer>
        <Header>
          <Title>Nueva Evaluación</Title>
        </Header>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Modelo de Evaluación *</Label>
            <StyledSelect
              options={evaluationModels}
              value={formData.evaluationModel}
              onChange={handleModelChange}
              placeholder="Selecciona un modelo..."
              isSearchable
              classNamePrefix="select"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Empleado a Evaluar *</Label>
            <StyledSelect
              options={employees}
              value={formData.evaluatedEmployee}
              onChange={(selected) => {
                console.log('Empleado seleccionado:', selected); // Debug
                setFormData(prev => ({
                  ...prev,
                  evaluatedEmployee: selected
                }));
              }}
              placeholder="Selecciona un empleado..."
              isSearchable
              classNamePrefix="select"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Participantes *</Label>
            <StyledSelect
              options={employees}
              value={formData.participants}
              onChange={(selected) => {
                console.log('Participantes seleccionados:', selected); // Debug
                setFormData(prev => ({
                  ...prev,
                  participants: selected || []
                }));
              }}
              placeholder="Selecciona los participantes..."
              isMulti
              isSearchable
              classNamePrefix="select"
              required
            />
          </FormGroup>

          <SubmitButton type="submit">
            Crear Evaluación
          </SubmitButton>
        </form>

        {selectedModel && (
          <PreviewSection>
            <SectionTitle>Vista Previa del Cuestionario</SectionTitle>
            {selectedModel.questions?.length > 0 ? (
              selectedModel.questions.map((question, index) => {
                console.log('Renderizando pregunta:', question);
                return (
                  <QuestionPreview key={question._id || index}>
                    <PreviewQuestion>{`${index + 1}. ${question.text}`}</PreviewQuestion>
                    <RadioOptionsGroup>
                      {question.options?.map((option, optIndex) => (
                        <RadioLabel key={option._id || optIndex}>
                          <RadioInput
                            type="radio"
                            name={`question-${question._id || index}`}
                            value={option._id}
                            disabled
                          />
                          <OptionText>{option.text}</OptionText>
                        </RadioLabel>
                      ))}
                    </RadioOptionsGroup>
                  </QuestionPreview>
                );
              })
            ) : (
              <QuestionPreview>
                <PreviewQuestion style={{ textAlign: 'center', color: '#94a3b8' }}>
                  Este modelo no tiene preguntas definidas
                </PreviewQuestion>
              </QuestionPreview>
            )}
          </PreviewSection>
        )}
      </PageContainer>
    );
  }

  // Si hay ID, mostrar vista de detalle
  if (!evaluation) {
    return <div>No se encontró la evaluación</div>;
  }

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pendiente',
      in_progress: 'En Progreso',
      completed: 'Completada'
    };
    return statusMap[status] || status;
  };

  // Verificar si el usuario actual es un participante
  const isParticipant = evaluation.participants?.some(
    p => p.employee?._id === user?._id
  );

  return (
    <PageContainer>
      <Header>
        <Title>Evaluación: {evaluation.evaluationModel?.name || 'Sin nombre'}</Title>
        <Status status={evaluation.status}>
          {getStatusText(evaluation.status)}
        </Status>
      </Header>

      <Section>
        <SectionTitle>Información General</SectionTitle>
        <Grid>
          <InfoCard>
            <Label>Empleado Evaluado</Label>
            <Value>{evaluation.employee?.firstName || 'No asignado'}</Value>
          </InfoCard>
          <InfoCard>
            <Label>Empleado Asignado</Label>
            <Value>{evaluation.evaluatedBy?.firstName || 'No asignado'}</Value>
          </InfoCard>
          {evaluation.overallScore !== undefined && (
            <InfoCard>
              <Label>Puntuación General</Label>
              <Value>{evaluation.overallScore.toFixed(2)}</Value>
            </InfoCard>
          )}
        </Grid>
      </Section>

      {evaluation.evaluationModel?.questions && (
        <QuestionsSection>
          <h2>Cuestionario</h2>
          {evaluation.evaluationModel.questions.map(question => (
            <QuestionCard key={question._id}>
              <Question>{question.question}</Question>
              <OptionsGrid>
                {question.options?.map(option => {
                  // Verificar si hay respuestas para esta pregunta
                  const isAnswered = answers[question.question]?.option === option.option;
                  
                  return (
                    <OptionButton
                      key={option._id}
                      isSelected={isAnswered}
                      disabled={evaluation.status === 'completed'}
                      onClick={() => handleAnswerChange(question.question, option.option, option.score)}
                    >
                      {option.option}
                    </OptionButton>
                  );
                })}
              </OptionsGrid>
            </QuestionCard>
          ))}
        </QuestionsSection>
      )}

      {isParticipant && evaluation.status !== 'completed' && (
        <SubmitButton 
          onClick={() => navigate(`/evaluations/${evaluation._id}/answer`)}
        >
          {evaluation.status === 'pending' ? 'Comenzar Evaluación' : 'Continuar Evaluación'}
        </SubmitButton>
      )}

      {user?.role === 'admin' && (
        <SubmitButton 
          onClick={() => navigate(`/evaluations/${evaluation._id}/results`)}
          style={{ marginTop: '1rem' }}
        >
          Ver Resultados
        </SubmitButton>
      )}
    </PageContainer>
  );
};

export default EvaluationPage; 

