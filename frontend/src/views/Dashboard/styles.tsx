import styled from 'styled-components';

// --- Componentes Estilizados (Styled Components) ---
export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  p {
    margin-top: 0.25rem;
    color: #4B5563;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const HeaderSubtitle = styled.div`
  margin-left: 3.6rem;
`;

// Componente estilizado para o botão para centralizar o CSS em um só lugar
export const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 9999px;

  &:hover {
    background-color: rgba(209, 213, 219, 0.5);
  }
`;


export const FilterSection = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  width: 100%;
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
`;

export const InputGroupContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px #6366F1;
  }
`;

export const DateTimeInput = styled.input`
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px #6366F1;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SummaryCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div<{ variant?: 'green' | 'blue' }>`
  padding: 0.75rem;
  border-radius: 9999px;
  margin-right: 1rem;
  background-color: ${props => props.variant === 'green' ? '#D1FAE5' : '#DBEAFE'};

  svg {
    height: 1.5rem;
    width: 1.5rem;
    color: ${props => props.variant === 'green' ? '#059669' : '#2563EB'};
  }
`;

export const CardContent = styled.div`
  p:first-child {
    font-size: 0.875rem;
    color: #4B5563;
  }
  p:last-child {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  padding: 1.5rem;
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
  p {
    margin-top: 0.25rem;
    color: #4B5563;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  min-width: 100%;
  border-collapse: collapse;
`;

export const THead = styled.thead`
  background-color: #F9FAFB;
`;

export const TBody = styled.tbody`
  background-color: white;
  & > tr {
     border-bottom: 1px solid #E5E7EB;
  }
   & > tr:last-child {
     border-bottom: none;
  }
`;

export const TH = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TD = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: #374151;

  &.font-medium {
    font-weight: 500;
    color: #111827;
  }
`;

export const EmptyState = styled.div`
    padding: 3rem 1.5rem;
    text-align: center;
    color: #6B7280;

    svg {
        height: 3rem;
        width: 3rem;
        margin: 0 auto 0.5rem;
        color: #9CA3AF;
    }
`;
