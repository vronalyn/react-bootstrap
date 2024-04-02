import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-12 text-center">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>
                    Sorry, the page you are looking
                    for does not exist.
                </p>
                <Link to = '/home' className='btn btn-dark text-white p-3'>Back to Home</Link >
            </div>
        </div>
    )
}

export default Error404