const Modal = ({setShowModal}) => {
    function handleClick(e) {
        if (e.target.classList.contains("backdrop")) {
            // setSelectedImage(null);
            setShowModal(false)
        }
    }

    return (
        <div
            className="backdrop"
            onClick={handleClick}
           
        >
            <div className="modal-section">
                <div>Thank you for confirming the slot</div>
            </div>
        </div>
    );
};

export default Modal