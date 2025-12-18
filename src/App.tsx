import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from './auth/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
