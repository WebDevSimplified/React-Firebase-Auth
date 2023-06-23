import React from 'react'
import Table from 'react-bootstrap/Table';
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function TaskTable({tasks, onDelete, onView}) {
  return (
    <div className="card shadow-sm rounded w-100 border-0">
      <div className="card-body">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {
            tasks.map(task => (
              <tr key={task.id}>
                <td style={{width: "20%"}}>{task.title}</td>
                <td className='text-truncate' style={{width: '35%', maxWidth: '500px'}}>{task.description}</td>
                <td style={{width:  "15%"}}>{new Date(task.due_date.seconds*1000).toISOString().split('T')[0]}</td>
                <td style={{width: "15%"}}>{task.status}</td>
                
                <td style={{width:  "15%"}}>
                  <div className="d-flex ">
                  <button className='btn btn-sm btn-info' onClick={() => onView(task)}><FontAwesomeIcon icon={faEye} /> View</button>
                  <button className='btn btn-sm btn-danger mx-1' onClick={() => onDelete(task)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                  </div>
                </td>
               
              </tr>
            ))
            }
        </tbody>
      </Table>
      </div>
      </div>
  )
}
