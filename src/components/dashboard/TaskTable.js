import React from 'react'
import Table from 'react-bootstrap/Table';

export default function TaskTable({tasks}) {
  console.log(tasks)
  return (
    <div className="card shadow rounded w-100">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>

          {
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{new Date(task.due_date.seconds*1000).toDateString()}</td>
                <td>View</td>
              </tr>
            ))
            }
        </tbody>
      </Table>
      </div>
  )
}
