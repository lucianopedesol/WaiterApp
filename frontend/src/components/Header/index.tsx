import { useNavigate } from "react-router";
import { Container, Content, StyledButton, LogoffButton, Nav, NavDropdown, NavSummary, NavDetails } from './styles';
import { useAuth } from "../../contexts/authContext";

export function Header() {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { user } = authState;

  return (
    <Container>
      <Content>
        <div className="details">
          <h1>Pedidos</h1>
          <h2>Acompanhe o pedido dos clientes</h2>
          <LogoffButton onClick={logout}>
            Sair
          </LogoffButton>
        </div>
        {/* <img src={logo} alt="Waiter App logo"/> */}

        {user?.profile === 'ADMIN' && (
          <Nav>
            <NavDetails>
              <NavSummary>
                Menu
              </NavSummary>
              <NavDropdown >
                <StyledButton onClick={() => navigate('/dashboard')}>
                  Dashboard
                </StyledButton>
                <StyledButton onClick={() => navigate('/backoffice')}>
                  Backoffice
                </StyledButton>
              </NavDropdown>
            </NavDetails>
          </Nav>
        )}
      </Content>
    </Container>
  );
}
