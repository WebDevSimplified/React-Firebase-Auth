import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { facebookProvider, githubProvider, googleProvider } from '../config/authMethods'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, socialMediaAuth } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/React-Firebase-Auth')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    async function handleSocials(provider) {
        try {
            setError('')
            setLoading(true)
            await socialMediaAuth(provider)
            history.push('/firebase')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)


    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>

                        <Button type='submit' className='w-100' disabled={loading}>Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-2 mb-2'><Link to='/React-Firebase-Auth/forgot-password'>Forgot Password?</Link></div>
                    <Button
                        variant="light"
                        onClick={()=>handleSocials(facebookProvider)}
                        type='submit' className='w-100 mb-3'
                        disabled={loading}>Log In with Facebook</Button>
                    <Button
                        variant="light"
                        onClick={() => handleSocials(googleProvider)}
                        type='submit'
                        className='w-100 mb-3'
                        disabled={loading}>Log In with Google</Button>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>Need an account? <Link to='/React-Firebase-Auth/signup'>Sign Up</Link></div>
        </>
    )
}

export default Login