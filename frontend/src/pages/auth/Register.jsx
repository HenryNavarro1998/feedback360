import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service';
import {
  AuthContainer,
  AuthCard,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  LinkText,
  ErrorMessage
} from '../../styles/auth.styles';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'employee',
    employeeId: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Crear cuenta</Title>
        <Subtitle>Registra tus datos para comenzar</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="role">Rol</Label>
              <Select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
              >
                <option value="employee">Empleado</option>
                <option value="manager">Gerente</option>
                <option value="admin">Administrador</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="employeeId">ID de Empleado</Label>
              <Input
                id="employeeId"
                name="employeeId"
                type="text"
                required
                placeholder="ID de empleado"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </div>
          </FormGroup>

          <Button type="submit">
            Registrarse
          </Button>

          <LinkText as={Link} to="/login">
            ¿Ya tienes cuenta? Inicia sesión
          </LinkText>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register; 