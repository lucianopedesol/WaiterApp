import styled, { createGlobalStyle } from "styled-components";

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

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;


// --- TEMA E ESTILOS GLOBAIS --- //
export const theme = {
  colors: {
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    secondary: '#6B7280',
    danger: '#EF4444',
    dangerHover: '#DC2626',
    success: '#10B981',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  borderRadius: '8px',
};

// --- COMPONENTES ESTILIZADOS (STYLED COMPONENTS) --- //
export const AppContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  background-color: ${theme.colors.surface};
  padding: 0.5rem;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border};
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  background-color: ${({ $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active }) =>
    $active ? theme.colors.surface : theme.colors.textSecondary};

  &:hover {
    background-color: ${({ $active }) =>
    $active ? theme.colors.primaryHover : theme.colors.background};
    color: ${({ $active }) =>
    $active ? theme.colors.surface : theme.colors.textPrimary};
  }
`;

export const Card = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.md};
  padding: 2rem;
  border: 1px solid ${theme.colors.border};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Button = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  ${({ variant }) => {
    switch (variant) {
      case 'danger':
        return `
          background-color: ${theme.colors.danger};
          color: white;
          &:hover { background-color: ${theme.colors.dangerHover}; }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.border};
          &:hover { background-color: ${theme.colors.background}; }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover { background-color: ${theme.colors.primaryHover}; }
        `;
    }
  }}
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Th = styled.th`
  padding: 0.75rem 1rem;
  background-color: ${theme.colors.background};
  color: ${theme.colors.textSecondary};
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  vertical-align: middle;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: ${theme.borderRadius};
  width: 100%;
  max-width: 900px;
  box-shadow: ${theme.shadows.md};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const FormGroup = styled.div<{ $width?: string }>`
  margin-bottom: 1rem;
  width: ${({ $width }) => $width || '100%'};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}30;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}30;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}30;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
`;



export const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  background-color: ${theme.colors.background};
`;

export const IngredientItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${theme.colors.surface};
  border-radius: 4px;
  border: 1px solid ${theme.colors.border};
  font-size: 0.9rem;
`;

export const IngredientInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 100%;

`;


export const FormContent = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  max-height: 600px;
  overflow-y: auto;
`;

