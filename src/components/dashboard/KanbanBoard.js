import React from "react"
import { Button, Container, Row } from "react-bootstrap"

import Kanban from "./Kanban"

export default function KanbanBoard() {


  return (
    <Container fluid className="app-container">
   
     <Button className="px-5" variant="success">Add Task</Button> 

      
      <Row className="mt-3">
        <Kanban title="Backlog" id="backlog"/>
        <Kanban title="In Progress" id="in-progress"/>
        <Kanban title="Done" id="done"/>
      </Row>

    </Container>
  )
}
