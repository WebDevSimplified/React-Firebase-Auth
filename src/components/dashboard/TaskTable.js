import React from 'react'
import Table from 'react-bootstrap/Table';
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function TaskTable({tasks}) {
  
  return (
    <div className="card shadow rounded w-100">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
          
          </tr>
        </thead>
        <tbody>

          {
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td className='text-truncate' style={{maxWidth: '8rem'}}>{task.description}</td>
                <td>{task.status}</td>
                <td>{new Date(task.due_date.seconds*1000).toDateString()}</td>
                <td><button className='btn btn-sm btn-info mx-2'><FontAwesomeIcon icon={faEye} /></button>
                <button className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button></td>
              </tr>
            ))
            }
        </tbody>
      </Table>
      </div>
  )
}
