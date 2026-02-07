import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/get-started" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect based on role
    if (user?.role === 'user') return <Navigate to="/user-insight" replace />;
    if (user?.role === 'institute') return <Navigate to="/insight" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
