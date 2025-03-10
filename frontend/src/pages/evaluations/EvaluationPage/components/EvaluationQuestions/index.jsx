import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  QuestionsSection, 
  QuestionCard, 
  Question, 
  OptionsGrid, 
  OptionButton,
  SubmitButton 
} from './styles';
import { useQuestions } from './hooks/useQuestions';
import { EvaluationQuestionsProps } from './types';

export const EvaluationQuestions = ({ questions, onSubmit, isCompleted }) => {
  const { answers, handleAnswerChange, handleSubmitAnswers } = useQuestions({
    questions,
    onSubmit
  });

  if (!questions?.length) {
    return (
      <QuestionsSection>
        <QuestionCard>
          <Question style={{ textAlign: 'center', color: '#94a3b8' }}>
            Este modelo no tiene preguntas definidas
          </Question>
        </QuestionCard>
      </QuestionsSection>
    );
  }

  return (
    <QuestionsSection>
      {questions.map((question, index) => (
        <QuestionCard key={question._id || index}>
          <Question>{`${index + 1}. ${question.text}`}</Question>
          <OptionsGrid>
            {question.options?.map((option, optIndex) => (
              <OptionButton
                key={option._id || optIndex}
                isSelected={answers[question._id]?.option === option._id}
                disabled={isCompleted}
                onClick={() => handleAnswerChange(question._id, option._id, option.score)}
              >
                {option.text}
              </OptionButton>
            ))}
          </OptionsGrid>
        </QuestionCard>
      ))}

      {!isCompleted && (
        <SubmitButton 
          onClick={handleSubmitAnswers}
          disabled={Object.keys(answers).length !== questions.length}
        >
          Enviar Respuestas
        </SubmitButton>
      )}
    </QuestionsSection>
  );
}; 