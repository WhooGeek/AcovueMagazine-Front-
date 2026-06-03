import { createContext, useContext, useState } from "react";
import "./ToastProvider.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info") => {
        const id = Date.now();

        setToasts((prev) => [
            ...prev,
            { id, message, type },
        ]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 2500);
    };

    return(
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if(!context){
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
}
