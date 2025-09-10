/**
 * @fileoverview Componente da página de login.
 * Contém o formulário de login e a lógica de autenticação.
 */
import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import {api} from '../../utils/api';

interface AuthResponse {
  token: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('user/login', { email, password });
      const token = response.data.token;
      login(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2 className="title">Login</h2>
        <form onSubmit={handleLogin} className="form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button
            type="submit"
            disabled={loading}
            className="button"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
