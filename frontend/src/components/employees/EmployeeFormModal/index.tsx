import React, { useState, useEffect } from 'react';
import { X } from "@phosphor-icons/react";
import { toast } from 'react-hot-toast';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Field,
  Label,
  Input,
  ButtonGroup,
  ActionButton
} from './styles';
import { EmployeeFormModalProps, EmployeeFormData } from './types';

const initialFormData: EmployeeFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  department: ''
};

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = 'Nuevo Empleado'
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone,
        position: initialData.position,
        department: initialData.department
      });
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
      toast.success('Empleado guardado exitosamente');
    } catch (error) {
      toast.error('Error al guardar el empleado');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup columns="1fr 1fr">
            <Field>
              <Label>Nombre</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
              />
            </Field>
            <Field>
              <Label>Apellido</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ingrese el apellido"
                required
              />
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <Label>Correo Electrónico</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese el correo electrónico"
                required
              />
            </Field>
          </FormGroup>

          <FormGroup>
            <Field>
              <Label>Teléfono</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingrese el teléfono"
                required
              />
            </Field>
          </FormGroup>

          <FormGroup columns="1fr 1fr">
            <Field>
              <Label>Cargo</Label>
              <Input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Ingrese el cargo"
                required
              />
            </Field>
            <Field>
              <Label>Departamento</Label>
              <Input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Ingrese el departamento"
                required
              />
            </Field>
          </FormGroup>

          <ButtonGroup>
            <ActionButton
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancelar
            </ActionButton>
            <ActionButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </ActionButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}; 