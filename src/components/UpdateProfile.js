import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassowrd, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updateEmail(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch((e) => {
            setError(e.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>

                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>

                        <Form.Group id='password-confirm'>
                            <Form.Label>Password-confirm</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>

                        <Button type='submit' className='w-100' disabled={loading}>Update</Button>

                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'><Link to='/login'>Cancel</Link></div>
        </>
    )
}

export default UpdateProfile