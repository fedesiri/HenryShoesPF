import { CloseBtn } from "../../styles/FormularioInicio";
import "./Modal.css";

const Modal = ({children, isOpen, closeModal}) => {
    const handleModalConteinerClick = e => e.stopPropagation();
    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container" onClick={handleModalConteinerClick}>
                <CloseBtn className="modal-close" onClick={closeModal}>X</CloseBtn>
                {children}
            </div>
        </article>
    )
}

export default Modal