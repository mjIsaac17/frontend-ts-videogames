import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({
  handleDelete,
  handleShowModal,
  confirmationMessage,
  buttonText = "Delete",
  buttonStyle = "danger",
}: {
  handleDelete: Function;
  handleShowModal: Function;
  confirmationMessage: string;
  buttonText?: string;
  buttonStyle?: string;
}) => {
  return (
    <>
      <Modal.Body>
        <p>{confirmationMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleShowModal(false)}>
          Cancel
        </Button>
        <Button variant={buttonStyle} onClick={() => handleDelete()}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ConfirmationModal;
