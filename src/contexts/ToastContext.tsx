import React, { useState, useCallback, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContext } from './ToastContext.context';
import type { ToastMessage, ToastType } from './types';
import Toast from '../components/ui/Toast';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, message: string, duration = 5000) => {
    const id = uuidv4();
    const newToast: ToastMessage = {
      id,
      type,
      message,
      duration,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-remove toast after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <div className="toast-container" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={true}
            onClose={() => hideToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
