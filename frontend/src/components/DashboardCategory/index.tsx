import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from "react-router";

import {
  DashboardContainer,
  Header,
  HeaderContainer,
  HeaderSubtitle,
  StyledButton,
  FilterSection,
  InputGroup,
  DateInput,
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
import { api } from '../../utils/api';

// --- Interfaces TypeScript ---
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderProduct {
  product: Product;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  table: string;
  status: string;
  products: OrderProduct[];
  createdAt: string;
}

interface CategorySummary {
  categoryName: string;
  totalValue: number;
  totalQuantity: number;
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

const categoryMap: { [key: string]: string } = {
  "68b220e6d1793b4b912cde20": "Bebidas",
  "68b220fbd1793b4b912cde23": "Pizzas",
};


// --- Componente Principal ---
export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  let navigate = useNavigate();


  useEffect(() => {
    api.get('orders').then(({ data }) => setOrders((data as Order[]) || []));
  }, []);

  // Função para formatar moeda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const processedData = useMemo(() => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (orderDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (orderDate > end) return false;
      }
      return true;
    });

    const categorySummary: { [key: string]: CategorySummary } = {};
    let grandTotalValue = 0;
    let grandTotalQuantity = 0;

    filteredOrders.forEach(order => {
      order.products.forEach(({ product, quantity }) => {
        const { category: categoryId, price } = product;
        const value = price * quantity;

        grandTotalValue += value;
        grandTotalQuantity += quantity;

        if (!categorySummary[categoryId]) {
          categorySummary[categoryId] = {
            categoryName: categoryMap[categoryId] || 'Desconhecida',
            totalValue: 0,
            totalQuantity: 0,
          };
        }

        categorySummary[categoryId].totalValue += value;
        categorySummary[categoryId].totalQuantity += quantity;
      });
    });

    return {
      grandTotalValue,
      grandTotalQuantity,
      categories: Object.values(categorySummary).sort((a, b) => b.totalValue - a.totalValue),
    };
  }, [orders, startDate, endDate]);

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
          <h2 style={{ fontWeight: 600, marginRight: '1rem' }}>Filtrar por data</h2>
          <InputGroup>
            <label htmlFor="start-date">Data de Início</label>
            <DateInput
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="end-date">Data de Fim</label>
            <DateInput
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </InputGroup>
        </FilterSection>

        <SummaryGrid>
          <SummaryCard>
            <IconWrapper variant="green">
              <DollarSignIcon />
            </IconWrapper>
            <CardContent>
              <p>Faturamento Total</p>
              <p>{formatCurrency(processedData.grandTotalValue)}</p>
            </CardContent>
          </SummaryCard>
          <SummaryCard>
            <IconWrapper variant="blue">
              <PackageIcon />
            </IconWrapper>
            <CardContent>
              <p>Total de Itens Vendidos</p>
              <p>{processedData.grandTotalQuantity}</p>
            </CardContent>
          </SummaryCard>
        </SummaryGrid>

        <TableContainer>
          <TableHeader>
            <h2>Vendas por Categoria</h2>
            <p>Detalhes dos valores e quantidades vendidas.</p>
          </TableHeader>
          <TableWrapper>
            <StyledTable>
              <THead>
                <tr>
                  <TH>Categoria</TH>
                  <TH>Itens Vendidos</TH>
                  <TH>Valor Total</TH>
                </tr>
              </THead>
              <TBody>
                {processedData.categories.length > 0 ? (
                  processedData.categories.map((cat) => (
                    <tr key={cat.categoryName}>
                      <TD className="font-medium">{cat.categoryName}</TD>
                      <TD>{cat.totalQuantity}</TD>
                      <TD className="font-medium">{formatCurrency(cat.totalValue)}</TD>
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

