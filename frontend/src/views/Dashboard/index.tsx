import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import {
  DashboardContainer,
  Header,
  HeaderContainer,
  HeaderSubtitle,
  StyledButton,
  FilterSection,
  InputGroup,
  InputGroupContent,
  DateInput,
  DateTimeInput,
  SummaryGrid,
  SummaryCard,
  IconWrapper,
  TableContainer,
  TableHeader,
  TableWrapper,
  StyledTable,
  THead,
  TBody,
  TH,
  TD,
  EmptyState,
  CardContent,
} from './styles';
import { api } from '../../server/api';

interface ProductSummary {
  productName: string;
  totalValue: number;
  totalQuantity: number;
}

interface ProcessedDataResult {
  grandTotalValue: number;
  grandTotalQuantity: number;
  products: ProductSummary[];
}

// --- Ícones (Componentes Funcionais Simples) ---
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const DollarSignIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PackageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16.5 9.4a4.5 4.5 0 1 1-9 0" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" x2="12" y1="22.08" y2="12" />
  </svg>
);

const BackIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

// --- Componente Principal ---
const Dashboard = () => {
  const [data, setData] = useState<ProcessedDataResult>({
    grandTotalValue: 0,
    grandTotalQuantity: 0,
    products: [],
  });
  // inicie as datas e horas com o valor do dia de hoje na hora zero e o end date com o valor do dia de hoje na hora 23:59
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState<string>('23:59');
  let navigate = useNavigate();

  // Buscar relatório do backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const params: any = {};
        if (startDate) params.startDate = startDate;
        if (startTime) params.startTime = startTime;
        if (endDate) params.endDate = endDate;
        if (endTime) params.endTime = endTime;

        const { data } = await api.get<ProcessedDataResult>('orders/report', { params });
        setData(data);
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
      }
    };

    fetchReport();
  }, [startDate, startTime, endDate, endTime]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleClearFilters = () => {
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
  }

  return (
    <>
      <DashboardContainer>
        <Header>
          <HeaderContainer>
            <StyledButton onClick={() => navigate('/')}>
              <BackIcon />
            </StyledButton>
            <h1>Relatório de Vendas</h1>
          </HeaderContainer>
          <HeaderSubtitle>Análise de pedidos por categoria.</HeaderSubtitle>
        </Header>
        <FilterSection>
          {/* <h2 style={{ fontWeight: 600, marginRight: '1rem' }}>Filtros</h2> */}
          <InputGroup>
            <label htmlFor="start-date">Início</label>
            <InputGroupContent>
              <DateInput
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <DateTimeInput
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </InputGroupContent>
          </InputGroup>
          <InputGroup>
            <label htmlFor="end-date">Fim</label>
            <InputGroupContent>
              <DateInput
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <DateTimeInput
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </InputGroupContent>
          </InputGroup>
          <StyledButton onClick={handleClearFilters}>
              Limpar
          </StyledButton>
        </FilterSection>
        <SummaryGrid>
          <SummaryCard>
            <IconWrapper variant="green">
              <DollarSignIcon />
            </IconWrapper>
            <CardContent>
              <p>Faturamento Total</p>
              <p>{formatCurrency(data.grandTotalValue)}</p>
            </CardContent>
          </SummaryCard>
          <SummaryCard>
            <IconWrapper variant="blue">
              <PackageIcon />
            </IconWrapper>
            <CardContent>
              <p>Total de Itens Vendidos</p>
              <p>{data.grandTotalQuantity}</p>
            </CardContent>
          </SummaryCard>
        </SummaryGrid>
        <TableContainer>
          <TableHeader>
            <h2>Vendas por Produto</h2>
            <p>Detalhes dos valores e quantidades vendidas.</p>
          </TableHeader>
          <TableWrapper>
            <StyledTable>
              <THead>
                <tr>
                  <TH>Produto</TH>
                  <TH>Itens Vendidos</TH>
                  <TH>Valor Total</TH>
                </tr>
              </THead>
              <TBody>
                {data.products.length > 0 ? (
                  data.products.map((prod) => (
                    <tr key={prod.productName}>
                      <TD className="font-medium">{prod.productName}</TD>
                      <TD>{prod.totalQuantity}</TD>
                      <TD className="font-medium">{formatCurrency(prod.totalValue)}</TD>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <EmptyState>
                        <CalendarIcon />
                        Nenhum dado encontrado para o período selecionado.
                      </EmptyState>
                    </td>
                  </tr>
                )}
              </TBody>
            </StyledTable>
          </TableWrapper>
        </TableContainer>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
