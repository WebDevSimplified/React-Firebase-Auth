import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {currentUser}=useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/React-Firebase-Auth/login'></Redirect>
            }}
        ></Route>
    )
}

export default PrivateRoute