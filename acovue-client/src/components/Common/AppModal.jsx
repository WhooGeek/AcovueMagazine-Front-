import "./AppModal.css";


export default function AppModal({
    open,
    title = "알림",
    message,
    confirmText = "확인",
    cancelText = "취소",
    showCancel = false,
    danger = false,
    onConfirm,
    onCancel
}){
    if (!open) return null;

    return(
        <div className="app-modal-overlay">
            <div className="app-modal">
                <p className="app-modal-title">{title}</p>
                <p className="app-modal-message">{message}</p>
                <div className="app-modal-actions">
                    {showCancel && <button className="app-modal-cancel" onClick={onCancel}>
                        {cancelText}
                    </button>}
                    <button className={`app-modal-confirm ${danger ? "danger" : ""}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
