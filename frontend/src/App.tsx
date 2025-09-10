import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Main } from './components/Main';
import { Dashboard } from './components/Dashboard';
import LoginPage from './components/Login';
import Spinner from './components/common/Spinner';
import { useAuth } from './contexts/authContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import { ReactNode } from 'react';
import Backoffice from './components/Backoffice';

const AuthRoute = ({ children, profile }: { children: ReactNode, profile: string[] }) => {
  return (
      <ProtectedRoute allowedProfiles={profile}>
        {children}
      </ProtectedRoute>
  )
}
function App() {
  const { authState } = useAuth();

  if (authState.loading) {
    return <Spinner />;
  }

  if (!authState.isAuthenticated) {
    return <LoginPage />;
  }

  // Define os perfis permitidos para a rota do Dashboard
  const mainAllowedProfiles = ['ADMIN', 'USER'];
  const dashboardAllowedProfiles = ['ADMIN'];

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<AuthRoute profile={mainAllowedProfiles}><Main /></AuthRoute>} />
            <Route path="/dashboard" element={<AuthRoute profile={dashboardAllowedProfiles}><Dashboard /></AuthRoute>} />
            <Route path="/backoffice" element={<AuthRoute profile={dashboardAllowedProfiles}><Backoffice /></AuthRoute>} />
          </Routes>
        </Router>
    </>

  );
}

export default App;
