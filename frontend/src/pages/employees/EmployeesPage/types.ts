import { Employee } from '../../../components/employees/EmployeeCard/types';

export interface Filter {
  type: 'department' | 'position';
  value: string;
}

export interface EmployeesPageState {
  employees: Employee[];
  loading: boolean;
  showModal: boolean;
  selectedEmployee: Employee | null;
  searchTerm: string;
  filters: Filter[];
  activeStatus: string;
} 