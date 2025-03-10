import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  MagnifyingGlass, 
  FunnelSimple,
  X,
  PencilSimple,
  Trash,
  EnvelopeSimple,
  Phone
} from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import employeeService from '../../services/employee.service';
import EmployeeCard from '../../components/employees/EmployeeCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmployeeFormModal from '../../components/employees/EmployeeFormModal';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.div`
  position: relative;
  width: 300px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.125rem;
`;

const FiltersContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #64748b;
  font-weight: 500;
`;

const FiltersSection = styled.div`
  & + & {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }
`;

const FiltersSectionTitle = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.75rem;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#2563eb' : '#f8fafc'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: 1px solid ${props => props.active ? '#2563eb' : '#e2e8f0'};
  border-radius: 2rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#1d4ed8' : '#f1f5f9'};
    border-color: ${props => props.active ? '#1d4ed8' : '#cbd5e1'};
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: #e0f2fe;
  color: #0284c7;
  border-radius: 1rem;
  font-size: 0.875rem;

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const DepartmentSection = styled.div`
  margin-bottom: 2rem;
`;

const DepartmentTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: normal;
  }
`;

const StatusFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.active ? `
    background: #2563eb;
    color: white;
    border: 1px solid #2563eb;
  ` : `
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
  `}

  &:hover {
    background: ${props => props.active ? '#1d4ed8' : '#f8fafc'};
  }
`;

const EmployeeCardContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const EmployeeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const EmployeeInfo = styled.div`
  flex: 1;
`;

const EmployeeName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;

  svg {
    color: #94a3b8;
  }
`;

const Position = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
`;

const Department = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: #f1f5f9;
  color: #475569;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.edit {
    background: #dbeafe;
    color: #2563eb;

    &:hover {
      background: #bfdbfe;
      color: #1d4ed8;
    }
  }

  &.delete {
    background: #fee2e2;
    color: #dc2626;

    &:hover {
      background: #fecaca;
      color: #b91c1c;
    }
  }
`;

const ManagerInfo = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.875rem;

  span {
    color: #1e293b;
    font-weight: 500;
  }
`;

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeFilter, setActiveFilter] = useState('active'); // 'active', 'inactive', 'all'
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployees();
        console.log('Datos recibidos:', data); // Para debugging
        setEmployees(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar empleados:', err);
        setError('Error al cargar los empleados');
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee => {
    if (!employee) return false;

    // Filtro por estado
    if (activeFilter !== 'all') {
      if (activeFilter === 'active' && employee.status !== 'active') return false;
      if (activeFilter === 'inactive' && employee.status === 'active') return false;
    }

    // Búsqueda por texto
    const searchQuery = searchTerm.toLowerCase().trim();
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesSearch = !searchQuery || 
      fullName.includes(searchQuery) ||
      employee.email?.toLowerCase().includes(searchQuery) ||
      employee.department?.toLowerCase().includes(searchQuery);

    // Filtros por departamento y posición
    const matchesDepartment = selectedDepartments.length === 0 || 
      selectedDepartments.includes(employee.department);

    const matchesPosition = selectedPositions.length === 0 || 
      selectedPositions.includes(employee.position);

    return matchesSearch && matchesDepartment && matchesPosition;
  });

  // Obtener departamentos y posiciones de manera segura
  const departments = [...new Set(employees
    .map(emp => emp?.department)
    .filter(Boolean))];

  const positions = [...new Set(employees
    .map(emp => emp?.position)
    .filter(Boolean))];

  const toggleDepartmentFilter = (department) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const togglePositionFilter = (position) => {
    setSelectedPositions(prev => 
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const removeFilter = (type, value) => {
    if (type === 'department') {
      setSelectedDepartments(prev => prev.filter(d => d !== value));
    } else if (type === 'position') {
      setSelectedPositions(prev => prev.filter(p => p !== value));
    }
  };

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedPositions([]);
    setSearchTerm('');
  };

  // Agrupar empleados por departamento después de aplicar filtros
  const groupedEmployees = React.useMemo(() => {
    return filteredEmployees.reduce((acc, employee) => {
      const dept = employee.department || 'Sin departamento';
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(employee);
      return acc;
    }, {});
  }, [filteredEmployees]);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  // Función para actualizar el estado de un empleado
  const handleStatusChange = async (id) => {
    if (!id) {
      console.error('ID de empleado no proporcionado');
      return;
    }

    const employee = employees.find(emp => emp._id === id);
    if (!employee) {
      console.error('Empleado no encontrado');
      return;
    }

    const newStatus = employee.status === 'active' ? 'inactive' : 'active';
    const confirmMessage = employee.status === 'active' 
      ? '¿Estás seguro de que deseas desactivar a este empleado?' 
      : '¿Estás seguro de que deseas activar a este empleado?';

    if (window.confirm(confirmMessage)) {
      try {
        // Enviar todos los datos del empleado con el estado actualizado
        const updatedEmployee = await employeeService.updateEmployee(id, {
          ...employee,
          status: newStatus
        });
        
        if (updatedEmployee) {
          // Actualizar el estado local solo si la actualización fue exitosa
          setEmployees(prevEmployees => 
            prevEmployees.map(emp => 
              emp._id === id ? updatedEmployee : emp
            )
          );
        }
      } catch (err) {
        console.error('Error al actualizar el estado:', err);
        setError('Error al actualizar el estado del empleado: ' + 
          (err.response?.data?.message || err.message));
      }
    }
  };

  // Actualizar handleSave para manejar mejor las actualizaciones
  const handleSave = async (formData) => {
    try {
      let updatedEmployee;
      if (selectedEmployee) {
        // Actualizar empleado existente
        updatedEmployee = await employeeService.updateEmployee(selectedEmployee._id, {
          ...formData,
          status: formData.status || selectedEmployee.status || 'active'
        });

        // Actualizar el estado inmediatamente
        setEmployees(prevEmployees => 
          prevEmployees.map(emp => 
            emp._id === selectedEmployee._id ? updatedEmployee : emp
          )
        );
      } else {
        // Crear nuevo empleado
        updatedEmployee = await employeeService.createEmployee({
          ...formData,
          status: 'active'
        });

        // Agregar el nuevo empleado al estado
        setEmployees(prevEmployees => [...prevEmployees, updatedEmployee]);
      }

      setIsModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error al guardar empleado:', err);
      setError(err.response?.data?.message || 'Error al guardar el empleado');
    }
  };

  // Actualizar la función handleDelete para usar handleStatusChange
  const handleDelete = (id) => {
    handleStatusChange(id);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PageContainer>
      <Header>
        <Title>Empleados</Title>
        <SearchContainer>
          <SearchInput>
            <MagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          <AddButton onClick={() => navigate('/employees/new')}>
            <Plus size={20} />
            Nuevo Empleado
          </AddButton>
        </SearchContainer>
      </Header>

      <FiltersContainer>
        <FiltersHeader>
          <FunnelSimple size={20} />
          Filtros
        </FiltersHeader>
        
        <FiltersSection>
          <FiltersSectionTitle>Estado</FiltersSectionTitle>
          <StatusFilter>
            <StatusButton 
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </StatusButton>
            <StatusButton 
              active={activeFilter === 'active'}
              onClick={() => setActiveFilter('active')}
            >
              Activos
            </StatusButton>
            <StatusButton 
              active={activeFilter === 'inactive'}
              onClick={() => setActiveFilter('inactive')}
            >
              Inactivos
            </StatusButton>
          </StatusFilter>
        </FiltersSection>

        <FiltersSection>
          <FiltersSectionTitle>Departamentos</FiltersSectionTitle>
          <ChipsContainer>
            {departments.map(department => (
              <FilterChip
                key={department}
                active={selectedDepartments.includes(department)}
                onClick={() => toggleDepartmentFilter(department)}
              >
                {department}
              </FilterChip>
            ))}
          </ChipsContainer>
        </FiltersSection>

        <FiltersSection>
          <FiltersSectionTitle>Cargos</FiltersSectionTitle>
          <ChipsContainer>
            {positions.map(position => (
              <FilterChip
                key={position}
                active={selectedPositions.includes(position)}
                onClick={() => togglePositionFilter(position)}
              >
                {position}
              </FilterChip>
            ))}
          </ChipsContainer>
        </FiltersSection>
      </FiltersContainer>

      {(selectedDepartments.length > 0 || selectedPositions.length > 0 || searchTerm) && (
        <ActiveFilters>
          {selectedDepartments.map(department => (
            <FilterTag key={department}>
              Departamento: {department}
              <button onClick={() => removeFilter('department', department)}>
                <X size={16} />
              </button>
            </FilterTag>
          ))}
          {selectedPositions.map(position => (
            <FilterTag key={position}>
              Cargo: {position}
              <button onClick={() => removeFilter('position', position)}>
                <X size={16} />
              </button>
            </FilterTag>
          ))}
          {searchTerm && (
            <FilterTag>
              Búsqueda: {searchTerm}
              <button onClick={() => setSearchTerm('')}>
                <X size={16} />
              </button>
            </FilterTag>
          )}
          <FilterTag>
            <button onClick={clearAllFilters}>Limpiar todos los filtros</button>
          </FilterTag>
        </ActiveFilters>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {Object.entries(groupedEmployees).map(([department, departmentEmployees]) => (
        <DepartmentSection key={department}>
          <DepartmentTitle>
            {department} <span>({departmentEmployees.length} empleados)</span>
          </DepartmentTitle>
          <Grid>
            {departmentEmployees.map(employee => (
              <EmployeeCardContainer>
                <EmployeeHeader>
                  <EmployeeInfo>
                    <EmployeeName>{`${employee.firstName} ${employee.lastName}`}</EmployeeName>
                    <ContactInfo>
                      <ContactItem>
                        <EnvelopeSimple size={16} weight="duotone" />
                        {employee.email}
                      </ContactItem>
                      <ContactItem>
                        <Phone size={16} weight="duotone" />
                        {employee.phone}
                      </ContactItem>
                    </ContactInfo>
                    <Position>{employee.position}</Position>
                    <Department>{employee.department}</Department>
                  </EmployeeInfo>
                  <Actions>
                    <ActionButton 
                      className="edit" 
                      onClick={() => handleEdit(employee)}
                      title="Editar empleado"
                    >
                      <PencilSimple size={20} />
                    </ActionButton>
                    <ActionButton 
                      className="delete" 
                      onClick={() => handleDelete(employee._id)}
                      title="Eliminar empleado"
                    >
                      <Trash size={20} />
                    </ActionButton>
                  </Actions>
                </EmployeeHeader>
                {employee.managerId && (
                  <ManagerInfo>
                    Manager: <span>{`${employee.managerId.firstName} ${employee.managerId.lastName}`}</span>
                  </ManagerInfo>
                )}
              </EmployeeCardContainer>
            ))}
          </Grid>
        </DepartmentSection>
      ))}

      {isModalOpen && (
        <EmployeeFormModal
          employee={selectedEmployee}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEmployee(null);
          }}
          onSave={handleSave}
        />
      )}
    </PageContainer>
  );
};

export default EmployeesPage; 