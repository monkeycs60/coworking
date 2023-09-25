import '../../styles/modalWindowStyle.css';

interface ModalWindowProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    overlayClass?: string;
    containerClass?: string;
    closeButtonClass?: string;
    svgClass?: string;
}

const ModalWindow = ({
    isOpen,
    onClose,
    children,
    overlayClass,
    containerClass,
    closeButtonClass,
    svgClass,
}: ModalWindowProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={`modal-overlay ${overlayClass}`} onClick={onClose}>
            <div
                className={`modal-container ${containerClass}`}
                onClick={(e) => e.stopPropagation()} // Cette ligne empêche la propagation du clic à l'overlay.
            >
                {children}
                <button
                    className={`modal-close ${closeButtonClass}`}
                    onClick={onClose}
                >
                    <svg
                        className={`close-svg h-4 w-4 fill-current ${svgClass}`}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                    >
                        <path d='M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59l-4.88-4.88a1 1 0 1 0-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L12 13.41l4.88 4.88a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L13.41 12l4.88-4.88a1 1 0 0 0 0-1.41z' />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ModalWindow;
