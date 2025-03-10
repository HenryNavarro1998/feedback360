import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MagnifyingGlass } from "@phosphor-icons/react";
import evaluationService from '../../../services/evaluation.service';
import { LoadingSpinner } from '../../../components/LoadingSpinner/index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SearchIcon = styled(MagnifyingGlass)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EvaluationsSection = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEvaluations();
  }, []);

  const loadEvaluations = async () => {
    try {
      const data = await evaluationService.getAllEvaluations();
      setEvaluations(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar las evaluaciones:', err);
      setError('Error al cargar las evaluaciones');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <SearchContainer>
        <SearchIcon size={20} />
        <SearchInput
          type="text"
          placeholder="Buscar evaluaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <Grid>
        {/* Aquí irán las tarjetas de las evaluaciones */}
        <div>Contenido de evaluaciones (en desarrollo)</div>
      </Grid>
    </Container>
  );
};

export default EvaluationsSection; 