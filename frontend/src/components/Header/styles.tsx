import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 198px;
  background-color: #D73035;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1216px;

  .details {
    h1 {
      font-size: 32px;
      color: #FFF;
    }

    h2 {
      font-size: 16px;
      color: #FFF;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
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
  color: #000;
  &:hover {
    background-color: rgba(209, 213, 219, 0.5);
  }
`;

export const NavMenu = styled.button`

`;
export const Nav = styled.nav`
  position: relative;
`;

export const NavDetails = styled.details`
  position: relative;
`;

export const NavSummary = styled.summary`
  cursor: pointer;
  font-weight: 500;
  padding: 8px 0;
  list-style: none;
  color: #FFF;

  &::-webkit-details-marker {
    display: none;
  }
`;

export const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  min-width: 160px;
`;
export const LogoffButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 9999px;
  color: #FFF;

`;
