import React from "react";
import {db} from "../../firebase";
import { Modal, Button } from "react-bootstrap";
export default function DeteletTaskModal({task, handleClose, show}) {

  const handleConfirm = () => {

    db.tasks.doc(task.id).delete();
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the task <b>'{task.title}'</b></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
