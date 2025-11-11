import React from 'react'
import { useAuth } from './context/AuthContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Login from './pages/Login'

function ProtectedRoute({children}) {
  const {user, loading} = useAuth()
  if(loading) return <div>Loading...</div>
  if(!user || user.role !== "admin") return <Navigate to="/login" />
  return children;
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path='/products' element={
        <ProtectedRoute>
          <Layout>
            <Products />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path='/profile' element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
    </BrowserRouter>
  )
}

export default App