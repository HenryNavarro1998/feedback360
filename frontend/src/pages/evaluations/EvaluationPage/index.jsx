import React from 'react';
import { useParams } from 'react-router-dom';
import { useEvaluation } from './hooks/useEvaluation';
import { EvaluationHeader } from './components/EvaluationHeader';
import { EvaluationInfo } from './components/EvaluationInfo';
import { EvaluationQuestions } from './components/EvaluationQuestions';
import { EvaluationActions } from './components/EvaluationActions';
import { PageContainer } from './styles';
import LoadingSpinner from '../../../components/LoadingSpinner';

const EvaluationPage = () => {
  const { id } = useParams();
  const { evaluation, loading, handleSubmitResponse } = useEvaluation(id);

  if (loading) return <LoadingSpinner />;

  return (
    <PageContainer>
      <EvaluationHeader 
        title={evaluation?.evaluationModel?.name} 
        status={evaluation?.status} 
      />
      
      <EvaluationInfo evaluation={evaluation} />
      
      <EvaluationQuestions 
        questions={evaluation?.evaluationModel?.questions}
        onSubmit={handleSubmitResponse}
        isCompleted={evaluation?.status === 'completed'}
      />
      
      <EvaluationActions 
        evaluationId={id}
        status={evaluation?.status}
      />
    </PageContainer>
  );
};

export default EvaluationPage; 