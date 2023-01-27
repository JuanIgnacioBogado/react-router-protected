import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ isAllowed, children, redirectTo = '/' }) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
};
