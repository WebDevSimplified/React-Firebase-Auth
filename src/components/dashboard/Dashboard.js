import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { Form } from "react-bootstrap";
import AddTaskModal from "../tasks/AddTaskModal";
import DeteletTaskModal from "../tasks/DeteletTaskModal";

import useBoard from "../../hooks/useBoard";
import KanbanBoard from "./KanbanBoard";
import TaskTable from "./TaskTable";
import ViewTaskModal from "../tasks/ViewTaskModal";

export default function Dashboard() {
  const { tasks } = useBoard();
  const [sortedTasks, setSortedTasks] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [displayMode, setDisplayMode] = useState("table");


  const handleTaskSorting = (e) => {
    const sort_by = e.target.value;
    if(sort_by === "") return;
    const taskCopy = [...tasks];
    taskCopy.sort((a, b) => {
      switch (sort_by) {
        case "title":
          return a.title.localeCompare(b.title);
        case "due_date":
          return b.due_date.seconds - a.due_date.seconds;
        case "status":
          const statusOrder = {
            "not started": 0,
            "in progress": 1,
            "completed": 2,
          }
          return statusOrder[a.status] - statusOrder[b.status];
      }
    
      return 0;
    })

    setSortedTasks(taskCopy)
    
    //tasks.sort((a, b) => {
  };

  const handleDeleteOpen = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleViewOpen = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setShowDeleteModal(false);
    setShowViewModal(false);
  };

  return (
    <Container fluid className="app-container">
      {selectedTask && (
        <DeteletTaskModal
          task={selectedTask}
          handleClose={handleClose}
          show={showDeleteModal}
        />
      )}
      {selectedTask && (
        <ViewTaskModal
          task={selectedTask}
          handleClose={handleClose}
          show={showViewModal}
        />
      )}
      <div className=" d-flex justify-content-between">
        <AddTaskModal />
        <Form>
          <Form.Group controlId="sortBy">
            <Form.Control as="select" name="status" onChange={handleTaskSorting}>
              <option value="" defaultChecked>Sort By</option>
              <option value="title">Title</option>
              <option value="due_date">Due Date</option>
              <option value="status">Status</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>

      <Row className="mt-3 px-3">
        {
          tasks.length > 0 ? (

            displayMode === "table" ? (
              <TaskTable
                tasks={sortedTasks || tasks}
                onDelete={handleDeleteOpen}
                onView={handleViewOpen}
              />
            ) : (
              <KanbanBoard />
            )
          
          ) : (
            <h2 className="text-center text-muted mt-2">No Tasks</h2>
          )

        }
       
      </Row>
    </Container>
  );
}
