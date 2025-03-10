import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Plus, Trash } from "@phosphor-icons/react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
    
    &:hover {
      background: #94a3b8;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1e293b;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'secondary' ? `
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background: #f8fafc;
    }
  ` : `
    background: #2563eb;
    color: white;
    border: none;
    
    &:hover {
      background: #1d4ed8;
    }
  `}
`;

const QuestionSection = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: white;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    background: #f1f5f9;
    border-radius: 1rem;
  }
`;

const OptionsContainer = styled.div`
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const OptionGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    border-color: #94a3b8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const OptionNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #f1f5f9;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
`;

const ScoreInput = styled(Input)`
  width: 80px;
  text-align: center;
  padding: 0.5rem;
  background: #f8fafc;
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

const RequiredToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
  }
`;

const QuestionDivider = styled.div`
  height: 2px;
  background: #e2e8f0;
  margin: 2rem 0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #fef2f2;
  }
`;

const EvaluationModelFormModal = ({ onClose, onSave, model = null }) => {
  const [formData, setFormData] = useState(model || {
    name: '',
    description: '',
    questions: [{
      question: '',
      required: true,
      options: [
        { option: '', score: 0 }
      ]
    }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          required: true,
          options: [{ option: '', score: 0 }]
        }
      ]
    });
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.push({ option: '', score: 0 });
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      const newQuestions = formData.questions.filter((_, i) => i !== index);
      setFormData({ ...formData, questions: newQuestions });
    }
  };

  const removeOption = (questionIndex, optionIndex) => {
    if (formData.questions[questionIndex].options.length > 1) {
      const newQuestions = [...formData.questions];
      newQuestions[questionIndex].options = newQuestions[questionIndex].options
        .filter((_, i) => i !== optionIndex);
      setFormData({ ...formData, questions: newQuestions });
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{model ? 'Editar Modelo' : 'Nuevo Modelo de Evaluación'}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nombre del Modelo</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Evaluación de Desempeño 2024"
              required
            />
          </Field>

          <Field>
            <Label>Descripción</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe el propósito y alcance de este modelo de evaluación..."
            />
          </Field>

          <div>
            <Label>Preguntas de la Evaluación</Label>
            {formData.questions.map((question, qIndex) => (
              <QuestionSection key={qIndex}>
                <QuestionHeader>
                  <QuestionTitle>
                    <Label>Pregunta {qIndex + 1}</Label>
                    <span>{question.required ? 'Obligatoria' : 'Opcional'}</span>
                  </QuestionTitle>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <RequiredToggle>
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => handleQuestionChange(qIndex, 'required', e.target.checked)}
                      />
                      Obligatoria
                    </RequiredToggle>
                    {formData.questions.length > 1 && (
                      <DeleteButton onClick={() => removeQuestion(qIndex)}>
                        <Trash size={20} />
                      </DeleteButton>
                    )}
                  </div>
                </QuestionHeader>

                <Field>
                  <Input
                    type="text"
                    placeholder="Escribe tu pregunta aquí..."
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                    required
                  />
                </Field>

                <OptionsContainer>
                  <Label>Opciones de Respuesta</Label>
                  {question.options.map((option, oIndex) => (
                    <OptionGroup key={oIndex}>
                      <OptionNumber>{oIndex + 1}</OptionNumber>
                      <Input
                        type="text"
                        placeholder="Opción de respuesta"
                        value={option.option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, 'option', e.target.value)}
                        required
                      />
                      <ScoreInput
                        type="number"
                        placeholder="Puntaje"
                        value={option.score}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, 'score', parseInt(e.target.value))}
                        required
                        min="0"
                        max="10"
                      />
                      {question.options.length > 1 && (
                        <DeleteButton onClick={() => removeOption(qIndex, oIndex)}>
                          <Trash size={16} />
                        </DeleteButton>
                      )}
                    </OptionGroup>
                  ))}
                  <ActionButton 
                    type="button" 
                    variant="secondary"
                    onClick={() => addOption(qIndex)}
                  >
                    <Plus size={16} />
                    Agregar Opción
                  </ActionButton>
                </OptionsContainer>
              </QuestionSection>
            ))}
            
            <ActionButton 
              type="button" 
              variant="secondary"
              onClick={addQuestion}
              style={{ width: '100%' }}
            >
              <Plus size={20} />
              Agregar Nueva Pregunta
            </ActionButton>
          </div>

          <QuestionDivider />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {model ? 'Guardar Cambios' : 'Crear Modelo'}
            </Button>
          </div>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EvaluationModelFormModal; 