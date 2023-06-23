import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";


export default function Kanban({ title, id}) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1"},
    { id: 2, title: "Task 2"},
  ])


  const handleDragStart = (e, task) => {
    //Transfer firebase task id to the dataTransfer object
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleDrop = (e, status) => {
    //To Receive dropped task
    const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10); //get task id
    //Update task status in firebase and local state
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Col>
      <p className="text-bold my-2">{title}</p>
      <div
        className="column"
        onDrop={(e) => handleDrop(e, id)}
        onDragOver={handleDragOver}
      >
        {tasks
          .map((task) => (
            <Card
              key={task.id}
              className="task"
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
            >
              <Card.Body>{task.title}</Card.Body>
            </Card>
          ))}
      </div>
    </Col>
  );
}
