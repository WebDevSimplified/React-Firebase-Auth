import React,{useState} from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

const Dashboard = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.pushState('/React-Firebase-Auth/login')
    } catch (error) {
      setError(error.message)
    }
    
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong>{currentUser ? currentUser.email : 'not loggedin'}
          <Link to='/React-Firebase-Auth/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
        </Card.Body>
      </Card>
      <Card>
        <div className='w-100 text-center mt-2'>
          <Button variant='link' onClick={handleLogout}>Log Out</Button>
        </div>
      </Card>
    </>
  )
}

export default Dashboard