import React from 'react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toastContainer" aria-live="polite">
      {toasts.map((toast) => {
        let icon = '☕';
        if (toast.type === 'success') icon = '✓';
        if (toast.type === 'warn') icon = '⚠️';

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{icon}</span> <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
