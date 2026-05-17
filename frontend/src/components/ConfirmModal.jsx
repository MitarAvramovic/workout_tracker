import "../styles/modal.css";

export default function ConfirmModal({
    open,
    title="Areu you sure?",
    description="This action cannot be undone.",
    onCancel,
    onConfirm
}) {
    if (!open) return null;

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h3>{title}</h3>
                <p>{description}</p>

                <div className="modal-action">
                    <button onClick={onCancel}>
                        Cancel
                    </button>

                    <button onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}