import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './protectedRoute';

import LoginPage from '../pages/LoginPage';
import { UserProvider } from '../providers/UserContext';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/*'
        element={          
          <UserProvider>
              <LoginPage />
          </UserProvider>
        }
      />
      <Route
        path='/register'
        element={          
          <UserProvider>
              <RegisterPage />
          </UserProvider>
        }
      />
      <Route
        path='/home'
        element={
          <UserProvider>
                <ProtectedRoute />
          </UserProvider>
        }
      >
        <Route path='/home' element={<HomePage />} />
      </Route>
      {/* <Route
        path='/house'
        element={
          <UserProvider>
            <HousesProvider>
              <ModalsProvider>
                <HousePage />
              </ModalsProvider>
            </HousesProvider>
          </UserProvider>
        }
      />
      <Route
        path='/login'
        element={
          <UserProvider>
            <LoginPage />
          </UserProvider>
        }
      />
      <Route
        path='/register'
        element={
          <UserProvider>
            <RegisterPage />
          </UserProvider>
        }
      />

      <Route
        path='/dashboard'
        element={
          <UserProvider>
            <HousesProvider>
              <ModalsProvider>
                <ProtectedRoute />
              </ModalsProvider>
            </HousesProvider>
          </UserProvider>
        }
      >
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>

      <Route path='/*' element={<ErrorPage />} /> */}
    </Routes>
  );
};

export default Router;
