export default function Toast({ toasts }) {
  if (toasts.length === 0) return null

  return (
    <div
      className="toast-container"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <div key={toast.id} className="toast" role="alert">
          <span className="toast-icon" aria-hidden="true">{toast.icon}</span>
          <div className="toast-text">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-sub">{toast.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
