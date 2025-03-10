import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Trash,
  User
} from "@phosphor-icons/react";
import { toast } from 'react-hot-toast';
import employeeService from '../../../services/employee.service';
import { Employee } from '../../../pages/evaluations/EvaluationsPage/types';
import { ParticipantsEditorProps, ParticipantCardProps, Participant } from './types';
import {
  Container,
  ParticipantsList,
  ParticipantCard,
  ParticipantInfo,
  ParticipantName,
  ParticipantRole,
  RemoveButton,
  AddParticipantButton,
  SelectContainer,
  Select
} from './styles';

const ParticipantCardComponent: React.FC<ParticipantCardProps> = ({
  participant,
  onRemove
}) => (
  <ParticipantCard>
    <ParticipantInfo>
      <ParticipantName>
        {participant.employee.firstName} {participant.employee.lastName}
      </ParticipantName>
      <ParticipantRole>{participant.role}</ParticipantRole>
    </ParticipantInfo>
    <RemoveButton onClick={onRemove}>
      <Trash size={20} />
    </RemoveButton>
  </ParticipantCard>
);

export const ParticipantsEditor: React.FC<ParticipantsEditorProps> = ({
  participants,
  onChange,
  evaluatedEmployeeId
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      toast.error('Error al cargar la lista de empleados');
    }
  };

  const handleAddParticipant = () => {
    if (!selectedEmployeeId) {
      toast.error('Por favor seleccione un empleado');
      return;
    }

    if (selectedEmployeeId === evaluatedEmployeeId) {
      toast.error('El empleado evaluado no puede ser evaluador');
      return;
    }

    if (participants.some(p => p.employee._id === selectedEmployeeId)) {
      toast.error('Este empleado ya es un participante');
      return;
    }

    const employee = employees.find(e => e._id === selectedEmployeeId);
    if (!employee) return;

    const newParticipant: Participant = {
      employee,
      role: 'evaluator'
    };

    onChange([...participants, newParticipant]);
    setSelectedEmployeeId('');
  };

  const handleRemoveParticipant = (index: number) => {
    onChange(participants.filter((_, i) => i !== index));
  };

  const availableEmployees = employees.filter(employee => 
    employee._id !== evaluatedEmployeeId &&
    !participants.some(p => p.employee._id === employee._id)
  );

  return (
    <Container>
      <SelectContainer>
        <Select
          value={selectedEmployeeId}
          onChange={e => setSelectedEmployeeId(e.target.value)}
        >
          <option value="">Seleccione un empleado</option>
          {availableEmployees.map(employee => (
            <option key={employee._id} value={employee._id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </Select>
        <AddParticipantButton onClick={handleAddParticipant}>
          <Plus size={20} />
          Agregar Participante
        </AddParticipantButton>
      </SelectContainer>

      <ParticipantsList>
        {participants.map((participant, index) => (
          <ParticipantCardComponent
            key={participant.employee._id}
            participant={participant}
            onRemove={() => handleRemoveParticipant(index)}
          />
        ))}
      </ParticipantsList>
    </Container>
  );
}; 