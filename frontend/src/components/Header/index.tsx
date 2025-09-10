import { useNavigate } from "react-router";
import logo from '../../assets/images/logo.svg';
import { Container, Content, StyledButton } from './styles';

const RightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <div className="details">
          <h1>Pedidos</h1>
          <h2>Acompanhe o pedido dos clientes</h2>

        </div>
        {/* <img src={logo} alt="Waiter App logo"/> */}
        <StyledButton onClick={() => navigate('/dashboard')}>
          Relatório <RightIcon />
        </StyledButton>
      </Content>
    </Container>
  );
}
