import React, { useState } from 'react';
import styled from 'styled-components';
import { RadioButton, X } from "@phosphor-icons/react";

const ResponseContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const QuestionCard = styled.div`
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

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${props => props.selected ? '#f0f9ff' : '#f8fafc'};
  border: 1px solid ${props => props.selected ? '#bae6fd' : '#e2e8f0'};
  border-radius: 0.5rem;
  cursor: ${props => props.readOnly ? 'default' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.readOnly ? '#f8fafc' : '#f0f9ff'};
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

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${props => props.checked ? '#f0f9ff' : '#f8fafc'};
  border: 1px solid ${props => props.checked ? '#bae6fd' : '#e2e8f0'};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f9ff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const EvaluationResponse = ({ 
  evaluation, 
  participant, 
  readOnly, 
  onSubmit,
  onClose 
}) => {
  const [answers, setAnswers] = useState(
    participant?.answers || {}
  );
  const [comments, setComments] = useState(
    participant?.comments || ''
  );

  const handleOptionSelect = (questionId, optionId) => {
    if (readOnly) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ answers, comments });
  };

  return (
    <ResponseContainer>
      <CloseButton onClick={onClose}>
        <X size={20} />
      </CloseButton>

      <Header>
        <Title>
          {readOnly 
            ? `Respuestas de ${participant.employee.firstName}`
            : 'Responder Evaluación'
          }
        </Title>
        <Subtitle>
          {readOnly
            ? 'Visualizando respuestas completadas'
            : 'Selecciona una opción para cada pregunta'
          }
        </Subtitle>
      </Header>

      <form onSubmit={handleSubmit}>
        {evaluation.evaluationModel.questions.map((question, index) => (
          <QuestionCard key={question._id || index}>
            <QuestionText>
              {`${index + 1}. ${question.question}`}
            </QuestionText>
            <OptionsList>
              {question.options.map((option) => (
                <div key={option._id}>
                  <RadioInput
                    type="radio"
                    id={`${question._id}-${option._id}`}
                    name={`question-${question._id}`}
                    value={option._id}
                    checked={answers[question._id] === option._id}
                    onChange={() => handleOptionSelect(question._id, option._id)}
                    disabled={readOnly}
                  />
                  <RadioLabel 
                    htmlFor={`${question._id}-${option._id}`}
                    checked={answers[question._id] === option._id}
                  >
                    <RadioButton 
                      size={24} 
                      weight={answers[question._id] === option._id ? "fill" : "regular"}
                    />
                    {option.option}
                  </RadioLabel>
                </div>
              ))}
            </OptionsList>
          </QuestionCard>
        ))}

        <CommentSection>
          <QuestionText>Comentarios adicionales</QuestionText>
          <TextArea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Escribe tus comentarios aquí..."
            disabled={readOnly}
          />
        </CommentSection>

        {!readOnly && (
          <Button 
            type="submit"
            disabled={
              Object.keys(answers).length !== 
              evaluation.evaluationModel.questions.length
            }
          >
            Enviar Evaluación
          </Button>
        )}
      </form>
    </ResponseContainer>
  );
};

export default EvaluationResponse; 