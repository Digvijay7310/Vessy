import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserRouter from './router/UserRoutes';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Routes>
      {/* User routes */}
      <Route path="/users/*" element={<UserRouter />} />

      {/* Admin routes */}
      <Route path="/admins/*" element={<AppRouter />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/users/login" replace />} />
    </Routes>
  );
}

export default App;
