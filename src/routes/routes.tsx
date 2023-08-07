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
                <ProtectedRoute></ProtectedRoute>
          </UserProvider>
        }
      >
        <Route path='/home' element={<HomePage />} />
      </Route>
      <Route
        path='/*'
        element={          
          <UserProvider>
              <LoginPage />
          </UserProvider>
        }
      />
      
    </Routes>
  );
};

export default Router;
