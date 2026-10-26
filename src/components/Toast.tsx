import { Check, X } from "lucide-react";

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon">
        <Check size={13} />
      </span>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss message">
        <X size={13} />
      </button>
    </div>
  );
}
