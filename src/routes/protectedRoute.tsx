import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessTOKEN');

  return token ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
