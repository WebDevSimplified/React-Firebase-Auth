import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Modal, Form } from 'react-bootstrap';
import { db } from '../../firebase';

export default function AddTaskModal(){
  const defaultFormData = { title: '', description: '', status: 'not started', due_date: '' };
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const {currentUser} = useAuth();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.tasks.add({
        ...formData, 
        due_date: db.formatDate(formData.due_date),
        user_id: currentUser.uid,
    });
    setFormData(defaultFormData);
    handleClose();
  };

  return (
    <>
      <Button className="px-4" variant="success" onClick={handleShow}>
        Add New Task
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" required>
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
                <Form.Control as="select" name="status" onChange={handleChange} required>
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due_date" onChange={handleChange} required/>
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
