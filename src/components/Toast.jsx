import React from 'react';
import { Check, Info } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <Check size={16} color="var(--gold-bright)" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
