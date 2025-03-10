import React, { useState } from 'react';
import { RadioButton, X } from "@phosphor-icons/react";
import { EvaluationResponseProps } from './types';
import {
  ResponseContainer,
  QuestionCard,
  QuestionText,
  OptionsList,
  RadioInput,
  RadioLabel,
  Button,
  CloseButton,
  Header,
  Title,
  Subtitle,
  TextArea,
  CommentSection
} from './styles';

export const EvaluationResponse: React.FC<EvaluationResponseProps> = ({ 
  evaluation, 
  participant, 
  readOnly = false, 
  onSubmit,
  onClose 
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(
    participant?.answers || {}
  );
  const [comments, setComments] = useState<string>(
    participant?.comments || ''
  );

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (readOnly) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
            ? `Respuestas de ${participant?.employee.firstName}`
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
          <QuestionCard key={question._id}>
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