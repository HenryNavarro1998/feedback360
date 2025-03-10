import React from 'react';
import { CheckCircle } from "@phosphor-icons/react";
import { useQuestions } from './hooks/useQuestions';
import { EvaluationQuestionsProps } from './types';
import {
  QuestionsSection,
  QuestionCard,
  Question,
  OptionsGrid,
  OptionButton,
  NoQuestionsMessage,
  SubmitButton
} from './styles';

export const EvaluationQuestions: React.FC<EvaluationQuestionsProps> = ({
  questions,
  onSubmit,
  isCompleted
}) => {
  const {
    answers,
    handleAnswerChange,
    handleSubmit,
    isAllAnswered
  } = useQuestions(questions, onSubmit, isCompleted);

  if (!questions?.length) {
    return (
      <NoQuestionsMessage>
        No hay preguntas definidas para esta evaluación
      </NoQuestionsMessage>
    );
  }

  return (
    <QuestionsSection>
      {questions.map((question, index) => {
        const answer = answers.find(a => a.questionId === question._id);

        return (
          <QuestionCard key={question._id}>
            <Question>
              {index + 1}. {question.text}
            </Question>
            <OptionsGrid>
              {question.options.map(option => (
                <OptionButton
                  key={option._id}
                  isSelected={answer?.selectedOptionId === option._id}
                  onClick={() => handleAnswerChange(question._id, option._id, option.score)}
                  disabled={isCompleted}
                >
                  {option.text}
                  {answer?.selectedOptionId === option._id && (
                    <CheckCircle size={20} weight="bold" />
                  )}
                </OptionButton>
              ))}
            </OptionsGrid>
          </QuestionCard>
        );
      })}

      {!isCompleted && (
        <SubmitButton
          onClick={handleSubmit}
          disabled={!isAllAnswered}
        >
          Enviar Respuestas
        </SubmitButton>
      )}
    </QuestionsSection>
  );
}; 