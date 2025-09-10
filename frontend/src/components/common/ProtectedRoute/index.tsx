
import React, { ReactNode } from 'react';
import { useAuth } from '../../../contexts/authContext';
import LoginPage from '../../Login';
import Spinner from '../Spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedProfiles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedProfiles }) => {
  const { authState, logout } = useAuth();
  const { isAuthenticated, user, loading } = authState;

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (user && allowedProfiles.includes(user.profile)) {
    return <>{children}</>;
  }else{
    history.back();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center border border-red-300">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Acesso Negado</h2>
        <p className="text-lg text-gray-700 mb-6">Você não tem permissão para visualizar esta página.</p>
        <button
          onClick={logout} // Força o refresh para ir para a tela de login
          className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-red-600 transition duration-200"
        >
          Voltar para o Login
        </button>
      </div>
    </div>
  );
};

export default ProtectedRoute;
