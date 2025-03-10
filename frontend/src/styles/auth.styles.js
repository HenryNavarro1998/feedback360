import styled from 'styled-components';

// Colores
const colors = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#3b82f6',
  white: '#ffffff',
  gray: '#64748b',
  grayLight: '#f1f5f9',
  error: '#ef4444',
  success: '#059669'
};

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 0.75rem;

  @media (max-width: 480px) {
    font-size: 1.875rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray};
  text-align: center;
  margin-bottom: 2.5rem;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.gray};
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;

  &:hover {
    border-color: ${colors.primary}80;
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 4px ${colors.primary}20;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled(Input).attrs({ as: 'select' })`
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(to right, ${colors.primary}, ${colors.primaryDark});
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background: linear-gradient(to right, ${colors.primaryDark}, ${colors.primary});
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px ${colors.primary}40;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LinkText = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  display: block;
  margin-top: 1.5rem;
  font-size: 0.875rem;

  &:hover {
    color: ${colors.primaryDark};
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #fef2f2;
  border-left: 4px solid ${colors.error};
  color: ${colors.error};
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '⚠️';
  }
`; 