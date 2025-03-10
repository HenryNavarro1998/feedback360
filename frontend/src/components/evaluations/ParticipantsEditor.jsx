import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, X, UserCircle, CaretDown } from "@phosphor-icons/react";
import employeeService from '../../services/employee.service';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ParticipantCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const ParticipantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ParticipantDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParticipantName = styled.span`
  font-weight: 500;
  color: #1e293b;
`;

const ParticipantRole = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const RoleSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fee2e2;
  }
`;

const SelectorContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectorButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #1e293b;
  font-size: 0.875rem;

  &:hover {
    border-color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
`;

const EmployeeOption = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }

  input {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const NoEmployees = styled.div`
  padding: 1rem;
  text-align: center;
  color: #64748b;
`;

const ROLES = {
  peer: 'Compañero',
  supervisor: 'Supervisor',
  subordinate: 'Subordinado'
};

const ParticipantsEditor = ({ participants, onChange, evaluatedEmployeeId }) => {
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar empleados:', err);
      setError('Error al cargar la lista de empleados');
    } finally {
      setLoading(false);
    }
  };

  const availableEmployees = employees.filter(emp => 
    emp._id !== evaluatedEmployeeId && 
    !participants.some(p => p.employee._id === emp._id)
  );

  const handleEmployeeSelect = (employee) => {
    const newParticipant = {
      employee,
      status: 'pending'
    };
    onChange([...participants, newParticipant]);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    onChange(newParticipants);
  };

  const handleRoleChange = (index, newRole) => {
    const newParticipants = [...participants];
    newParticipants[index] = {
      ...newParticipants[index],
      role: newRole
    };
    onChange(newParticipants);
  };

  if (loading) return <div>Cargando empleados...</div>;
  if (error) return <div style={{ color: '#ef4444' }}>{error}</div>;

  return (
    <EditorContainer>
      <SelectorContainer>
        <SelectorButton type="button" onClick={() => setIsOpen(!isOpen)}>
          <span>Agregar participantes</span>
          <CaretDown size={20} />
        </SelectorButton>

        {isOpen && (
          <DropdownList>
            {availableEmployees.length === 0 ? (
              <NoEmployees>No hay más empleados disponibles</NoEmployees>
            ) : (
              availableEmployees.map(employee => (
                <EmployeeOption
                  key={employee._id}
                  onClick={() => {
                    handleEmployeeSelect(employee);
                    setIsOpen(false);
                  }}
                >
                  <UserCircle size={24} />
                  <div>
                    <ParticipantName>
                      {`${employee.firstName} ${employee.lastName}`}
                    </ParticipantName>
                    <ParticipantRole>{employee.position}</ParticipantRole>
                  </div>
                </EmployeeOption>
              ))
            )}
          </DropdownList>
        )}
      </SelectorContainer>

      <ParticipantsList>
        {participants.map((participant, index) => (
          <ParticipantCard key={participant.employee._id}>
            <ParticipantInfo>
              <UserCircle size={32} weight="duotone" />
              <ParticipantDetails>
                <ParticipantName>
                  {`${participant.employee.firstName} ${participant.employee.lastName}`}
                </ParticipantName>
                <ParticipantRole>{participant.employee.position}</ParticipantRole>
              </ParticipantDetails>
            </ParticipantInfo>
            <RemoveButton onClick={() => handleRemoveParticipant(index)}>
              <X size={20} />
            </RemoveButton>
          </ParticipantCard>
        ))}
      </ParticipantsList>
    </EditorContainer>
  );
};

export default ParticipantsEditor; 