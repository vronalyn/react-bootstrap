import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
            <div className="container-fluid">
              <div className="row text-muted">
                <div className="col-6 text-start">
                  <p className="mb-0">
                    <Link to={'/home'} className="text-muted">
                      <strong>WaterMS</strong>
                    </Link>
                  </p>
                </div>
                <div className="col-6 text-end">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <Link to={'/'} className="text-muted">Contact</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={'/'} className="text-muted">About Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
  )
}

export default Footer