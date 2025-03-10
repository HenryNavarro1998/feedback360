import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const PageContainer = styled.div`
  padding: ${theme.spacing.xlarge};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xlarge};
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize.xlarge};
  font-weight: 600;
  color: ${theme.colors.text};
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.medium};
  align-items: center;
`;

export const SearchInput = styled.div`
  position: relative;
  width: 300px;

  input {
    width: 100%;
    padding: ${theme.spacing.medium} ${theme.spacing.medium} ${theme.spacing.medium} 2.5rem;
    border: 1px solid ${theme.colors.grayLight};
    border-radius: ${theme.borderRadius.medium};
    font-size: ${theme.fontSize.small};
    transition: all ${theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}20;
    }
  }

  svg {
    position: absolute;
    left: ${theme.spacing.medium};
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.gray};
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.large};
`;

export const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing.xlarge};
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.large};
`;

export const FiltersContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.large};
  margin-bottom: ${theme.spacing.xlarge};
  box-shadow: ${theme.shadows.small};
`;

export const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.medium};
  color: ${theme.colors.gray};
  font-weight: 500;
`;

export const FiltersSection = styled.div`
  & + & {
    margin-top: ${theme.spacing.medium};
    padding-top: ${theme.spacing.medium};
    border-top: 1px solid ${theme.colors.grayLight};
  }
`;

export const FiltersSectionTitle = styled.div`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.medium};
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.small};
`;

interface FilterChipProps {
  active?: boolean;
}

export const FilterChip = styled.div<FilterChipProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  background: ${props => props.active ? theme.colors.primary : theme.colors.background};
  color: ${props => props.active ? theme.colors.white : theme.colors.gray};
  border: 1px solid ${props => props.active ? theme.colors.primary : theme.colors.grayLight};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.small};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${props => props.active ? theme.colors.secondary : theme.colors.grayLight};
    border-color: ${props => props.active ? theme.colors.secondary : theme.colors.gray};
  }
`;

export const ActiveFilters = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.large};
  flex-wrap: wrap;
  padding: ${theme.spacing.medium};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
`;

export const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.small};

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

export const DepartmentSection = styled.div`
  margin-bottom: ${theme.spacing.xlarge};
`;

export const DepartmentTitle = styled.h2`
  font-size: ${theme.fontSize.large};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};

  span {
    color: ${theme.colors.gray};
    font-size: ${theme.fontSize.small};
    font-weight: normal;
  }
`;

export const StatusFilter = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.medium};
`;

interface StatusButtonProps {
  active?: boolean;
}

export const StatusButton = styled.button<StatusButtonProps>`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSize.small};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  ${props => props.active ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
  ` : `
    background: ${theme.colors.white};
    color: ${theme.colors.gray};
    border: 1px solid ${theme.colors.grayLight};
  `}

  &:hover {
    background: ${props => props.active ? theme.colors.secondary : theme.colors.background};
  }
`; 