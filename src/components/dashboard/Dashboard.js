import React, {useState} from "react";
import { Container, Row } from "react-bootstrap";

import AddTaskModal from "../tasks/AddTaskModal";

import useBoard from "../../hooks/useBoard";
import KanbanBoard from "./KanbanBoard";
import TaskTable from "./TaskTable";

export default function Dashboard() {

  const { tasks } = useBoard();
  const [selectedTask, setSelectedTask] = useState(null);

  const [displayMode, setDisplayMode] = useState("table");

  return (
    <Container fluid className="app-container">
      <div className="d-flex justify-content-between">
        
        <AddTaskModal />
      </div>

      <Row className="mt-3 px-3">
        {
            displayMode === "table" ? (
             <TaskTable tasks={tasks}/>
            ) : <KanbanBoard />
        }
      </Row>
    </Container>
  );
}
