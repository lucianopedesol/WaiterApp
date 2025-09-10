/**
 * @fileoverview Define o contexto de autenticação, o provedor e o hook personalizado.
 * Agora o contexto decodifica o token para obter o perfil do usuário.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interfaces para os tipos de dados
interface User {
  username: string;
  profile: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função auxiliar para decodificar o token JWT
const decodeJwtToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Falha ao decodificar o token:", error);
    return null;
  }
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Componente Provedor de Autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    loading: true,
    error: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = decodeJwtToken(token);
      if (user) {
        setAuthState({
          isAuthenticated: true,
          token,
          loading: false,
          error: null,
          user,
        });
      } else {
        localStorage.removeItem('authToken');
        setAuthState({ ...authState, loading: false });
      }
    } else {
      setAuthState({ ...authState, loading: false });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    const user = decodeJwtToken(token);
    if (user) {
      setAuthState({
        ...authState,
        isAuthenticated: true,
        token,
        error: null,
        user,
      });
    } else {
      setAuthState({ ...authState, error: "Token inválido.", loading: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      isAuthenticated: false,
      token: null,
      loading: false,
      error: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
