import { createContext, useState, useContext } from 'react'

const ToastContext = createContext()
export const ToastProvider = ({children}) => {
    const [toasts, setToasts] = useState([])

    const showToast = (message, type = "success") => {
        const id = Date.now();
        setToasts([...toasts, {id, message, type}])
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2000)
    }
  return (
    <ToastContext.Provider value={{showToast}}>
        {children}
        <div className="fixed top-5 right-5 space-y-2 z-50">
            {toasts.map((toast) => (
                <div key={toast.id}
                className={`p-3 rounded shadow-md text-white ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}
                >
                {toast.message}
                </div>
            ))}
        </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)