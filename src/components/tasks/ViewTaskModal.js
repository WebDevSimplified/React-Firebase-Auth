import React, { useState } from "react";
import { db } from "../../firebase";
import { Modal, Button, Form } from "react-bootstrap";

export default function ViewTaskModal({ task, handleClose, show }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    due_date: new Date(task.due_date.seconds * 1000).toISOString().split('T')[0],
  });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        db.tasks.doc(task.id).update({
            ...formData,
            due_date: db.formatDate(formData.due_date),
        });
        setEditMode(false);
    };
    
  return editMode ? (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="status" onChange={handleChange}>
              <option value="not started" selected={task.status == "not started"}>Not Started</option>
              <option value="in progress" selected={task.status == "in progress"}>In Progress</option>
              <option value="completed" selected={task.status == "completed"}>Completed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setEditMode(false)}>
          Exit
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="small-title">Description</p>
        <p>{task.description}</p>
        <p className="small-title">Due Date</p>
        <p>{new Date(task.due_date.seconds * 1000).toISOString().split('T')[0]}</p>
        <p className="small-title">Status</p>
        <p>{task.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => setEditMode(true)}>
            Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
}
