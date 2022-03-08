import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your email to follow instructions')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button type='submit' className='w-100' disabled={loading}>Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-2'><Link to='/React-Firebase-Auth/login'>Log In</Link></div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>Need an account? <Link to='/React-Firebase-Auth/signup'>Sign Up</Link></div>
        </>
    )
}

export default ForgotPassword