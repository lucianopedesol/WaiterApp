import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactNode } from 'react';

import { useAuth } from './contexts/authContext';

import ProtectedRoute from './components/common/ProtectedRoute';
import Main from './views/Main';
import Backoffice from './views/Backoffice';
import LoginPage from './views/Login';
import Spinner from './components/common/Spinner';
import Dashboard from './views/Dashboard';


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

  const mainAllowedProfiles = ['ADMIN', 'USER'];
  const dashboardAllowedProfiles = ['ADMIN'];
  const backofficeAllowedProfiles = ['ADMIN'];

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute profile={mainAllowedProfiles}><Main /></AuthRoute>} />
          <Route path="/dashboard" element={<AuthRoute profile={dashboardAllowedProfiles}><Dashboard /></AuthRoute>} />
          <Route path="/backoffice" element={<AuthRoute profile={backofficeAllowedProfiles}><Backoffice /></AuthRoute>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
