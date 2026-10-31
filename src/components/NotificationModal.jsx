import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * Componente de Ventana Emergente (Modal) profesional para mensajes de error o confirmación.
 * Muestra una tarjeta estilizada y un backdrop con degradado/blur.
 */
const NotificationModal = ({
  show,
  onHide,
  type = 'error',
  title,
  message,
  primaryLabel = 'Aceptar',
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
}) => {
  const isError = type === 'error';

  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      onHide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      className="notification-modal"
    >
      <Modal.Header 
        closeButton 
        className={isError ? 'bg-danger text-white' : 'bg-success text-white'}
      >
        <Modal.Title className="h5 mb-0 fw-bold d-flex align-items-center gap-2">
          <span>{isError ? '🚫' : '✅'}</span>
          <span>{title || (isError ? 'Atención / Error' : 'Confirmación')}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-4 px-4 text-center">
        <div className="mb-3 fs-1">
          {isError ? '⚠️' : '🎉'}
        </div>
        <p className="mb-0 fs-6 text-dark fw-medium leading-relaxed">
          {message}
        </p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center bg-light border-0 pt-0 pb-3 gap-2 flex-wrap">
        {secondaryLabel && (
          <Button
            variant="outline-secondary"
            onClick={onSecondaryClick}
            className="px-3 py-2 fw-semibold rounded-pill shadow-sm"
          >
            {secondaryLabel}
          </Button>
        )}
        <Button
          variant={isError ? 'danger' : 'success'}
          onClick={handlePrimary}
          className="px-4 py-2 fw-semibold rounded-pill shadow-sm"
        >
          {primaryLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
