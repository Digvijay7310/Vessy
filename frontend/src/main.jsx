import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ToastProvider from './context/ToastContext.jsx'
import UserAuthProvider from './context/UserAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <AuthProvider>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </AuthProvider>
  </ToastProvider>,
)
