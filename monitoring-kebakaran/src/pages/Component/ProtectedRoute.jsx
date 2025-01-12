import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const localToken = localStorage.getItem('token');
  const location = useLocation();

  if (!token && !localToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
