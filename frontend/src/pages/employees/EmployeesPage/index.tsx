import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MagnifyingGlass, 
  FunnelSimple,
  X
} from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import employeeService from '../../../services/employee.service';
import { EmployeeCard } from '../../../components/employees/EmployeeCard/index';
import { LoadingSpinner } from '../../../components/LoadingSpinner/index';
import { EmployeeFormModal } from '../../../components/employees/EmployeeFormModal';
import { Employee } from '../../../components/employees/EmployeeCard/types';
import { EmployeeFormData } from '../../../components/employees/EmployeeFormModal/types';
import { EmployeesPageState, Filter } from './types';
import {
  PageContainer,
  Header,
  Title,
  SearchContainer,
  SearchInput,
  AddButton,
  Grid,
  NoResults,
  FiltersContainer,
  FiltersHeader,
  FiltersSection,
  FiltersSectionTitle,
  ChipsContainer,
  FilterChip,
  ActiveFilters,
  FilterTag,
  DepartmentSection,
  DepartmentTitle,
  StatusFilter,
  StatusButton
} from './styles';

export const EmployeesPage: React.FC = () => {
  const [state, setState] = useState<EmployeesPageState>({
    employees: [],
    loading: true,
    showModal: false,
    selectedEmployee: null,
    searchTerm: '',
    filters: [],
    activeStatus: 'all'
  });

  const navigate = useNavigate();

  const loadEmployees = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const data = await employeeService.getAll();
      setState(prev => ({ ...prev, employees: data }));
    } catch (error) {
      console.error('Error loading employees:', error);
      toast.error('Error al cargar los empleados');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const toggleDepartmentFilter = (department: string) => {
    setState(prev => {
      const filterExists = prev.filters.some(f => f.type === 'department' && f.value === department);
      const newFilters = filterExists
        ? prev.filters.filter(f => !(f.type === 'department' && f.value === department))
        : [...prev.filters, { type: 'department', value: department }];
      return { ...prev, filters: newFilters };
    });
  };

  const togglePositionFilter = (position: string) => {
    setState(prev => {
      const filterExists = prev.filters.some(f => f.type === 'position' && f.value === position);
      const newFilters = filterExists
        ? prev.filters.filter(f => !(f.type === 'position' && f.value === position))
        : [...prev.filters, { type: 'position', value: position }];
      return { ...prev, filters: newFilters };
    });
  };

  const removeFilter = (type: Filter['type'], value: string) => {
    setState(prev => ({
      ...prev,
      filters: prev.filters.filter(f => !(f.type === type && f.value === value))
    }));
  };

  const clearAllFilters = () => {
    setState(prev => ({ ...prev, filters: [], searchTerm: '', activeStatus: 'all' }));
  };

  const handleEdit = (employee: Employee) => {
    setState(prev => ({ ...prev, selectedEmployee: employee, showModal: true }));
  };

  const handleAdd = () => {
    setState(prev => ({ ...prev, selectedEmployee: null, showModal: true }));
  };

  const handleSave = async (formData: EmployeeFormData) => {
    try {
      if (state.selectedEmployee) {
        await employeeService.update(state.selectedEmployee._id, formData);
        toast.success('Empleado actualizado exitosamente');
      } else {
        await employeeService.create(formData);
        toast.success('Empleado creado exitosamente');
      }
      loadEmployees();
      setState(prev => ({ ...prev, showModal: false, selectedEmployee: null }));
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Error al guardar el empleado');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este empleado?')) {
      try {
        await employeeService.delete(id);
        toast.success('Empleado eliminado exitosamente');
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error('Error al eliminar el empleado');
      }
    }
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  const filteredEmployees = state.employees.filter(employee => {
    const matchesSearch = employee.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(state.searchTerm.toLowerCase());

    const matchesFilters = state.filters.length === 0 || state.filters.every(filter => {
      if (filter.type === 'department') return employee.department === filter.value;
      if (filter.type === 'position') return employee.position === filter.value;
      return true;
    });

    return matchesSearch && matchesFilters;
  });

  const departments = [...new Set(state.employees.map(e => e.department))];
  const positions = [...new Set(state.employees.map(e => e.position))];

  return (
    <PageContainer>
      <Header>
        <Title>Empleados</Title>
        <SearchContainer>
          <SearchInput>
            <input
              type="text"
              placeholder="Buscar empleados..."
              value={state.searchTerm}
              onChange={e => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
            <MagnifyingGlass size={20} />
          </SearchInput>
          <AddButton onClick={handleAdd}>
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

        {state.filters.length > 0 && (
          <ActiveFilters>
            {state.filters.map((filter, index) => (
              <FilterTag key={index}>
                {filter.value}
                <button onClick={() => removeFilter(filter.type, filter.value)}>
                  <X size={16} />
                </button>
              </FilterTag>
            ))}
            <FilterTag>
              <button onClick={clearAllFilters}>
                Limpiar filtros
              </button>
            </FilterTag>
          </ActiveFilters>
        )}

        <FiltersSection>
          <FiltersSectionTitle>Departamentos</FiltersSectionTitle>
          <ChipsContainer>
            {departments.map((department, index) => (
              <FilterChip
                key={index}
                active={state.filters.some(f => f.type === 'department' && f.value === department)}
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
            {positions.map((position, index) => (
              <FilterChip
                key={index}
                active={state.filters.some(f => f.type === 'position' && f.value === position)}
                onClick={() => togglePositionFilter(position)}
              >
                {position}
              </FilterChip>
            ))}
          </ChipsContainer>
        </FiltersSection>
      </FiltersContainer>

      {filteredEmployees.length === 0 ? (
        <NoResults>No se encontraron empleados</NoResults>
      ) : (
        <Grid>
          {filteredEmployees.map(employee => (
            <EmployeeCard
              key={employee._id}
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Grid>
      )}

      <EmployeeFormModal
        isOpen={state.showModal}
        onClose={() => setState(prev => ({ ...prev, showModal: false, selectedEmployee: null }))}
        onSubmit={handleSave}
        initialData={state.selectedEmployee}
        title={state.selectedEmployee ? 'Editar Empleado' : 'Nuevo Empleado'}
      />
    </PageContainer>
  );
}; 