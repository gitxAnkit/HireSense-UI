import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type UserRole } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role is not allowed
    if (user.role === 'candidate') {
      return <Navigate to="/candidate/dashboard" replace />;
    } else {
      return <Navigate to="/interviewer/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
