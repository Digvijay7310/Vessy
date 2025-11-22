import { useState } from "react"
import { createContext } from "react"


export const ToastContext = createContext()

export default function ToastProvider({children}){
    const [toasts, setToasts] = useState([])

    const addToast = (type, message) => {
        const id = Date.now()
        setToasts([...toasts, {id, type, message}]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000)
    }

    const toast = {
        success: (msg) => addToast("success", msg),
        error: (msg) => addToast("error", msg)
    }

    return (
        <ToastContext.Provider value={{toast}}>
            {children}

            <div className="fixed top-4 right-4 space-y-3 z-50">
                {toasts.map((t) => (
                    <div key={t.id}
                    className={`px-4 py-2 rounded shadow text-white ${t.type === 'success' ? "bg-green-600" : "bg-red-600"}`}>
                        {t.message}
                        </div>

                ))}
            </div>
        </ToastContext.Provider>


    )
}