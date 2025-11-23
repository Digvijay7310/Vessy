import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ToastProvider from './context/ToastContext.jsx'
import UserAuthProvider from './context/UserAuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <UserAuthProvider>
         <App />
        </UserAuthProvider>
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>,
)

