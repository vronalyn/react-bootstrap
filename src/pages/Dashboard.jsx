import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar2 from '../components/Navbar2'


const Dashboard = () => {

  return (
    <div>

      <div className="wrapper ">
        <Sidebar />
        <div className="main">
          <Navbar2 />
          <main className="content px-3 py-2 bg-secondary bg-opacity-10">
            <div className="container-fluid">

              <div className="mb-3">
                <h1 className='fw-bold'>Dashboard</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-12 col-md-4 d-flex">
                  <div className="card flex-fill border-0">
                    <div className="card-body py-4">
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <h1 className="mb-2">
                            <i className='bx bx-droplet'></i> 100 L
                          </h1>
                          <p className="mb-2">
                            Total Usage
                          </p>
                          <div className="mb-0">
                            <span className="badge text-success me-2">
                              +9.0%
                            </span>
                            <span className="text-muted">
                              Since Last Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 d-flex">
                  <div className="card flex-fill border-0">
                    <div className="card-body py-4">
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <h1 className="mb-2">
                            $ 78.00
                          </h1>
                          <p className="mb-2">
                            Total Bill
                          </p>
                          <div className="mb-0">
                            <span className="badge text-success me-2">
                              +9.0%
                            </span>
                            <span className="text-muted">
                              Since Last Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4 d-flex">
                  <div className="card flex-fill border-0">
                    <div className="card-body py-4">
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <h1 className="mb-2">
                            $ 78.00
                          </h1>
                          <p className="mb-2">
                            Total Bill
                          </p>
                          <div className="mb-0">
                            <span className="badge text-success me-2">
                              +9.0%
                            </span>
                            <span className="text-muted">
                              Since Last Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className='row'>
              <div className="row my-4">
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="col-8 col-md">
                    <div className="heading-text my-3">
                        <h3 className="lh-1 fw-bold">Realtime Analytics</h3>
                        <p>Write a short description here.</p>
                      </div>
                    </div>

                    <div className="col-4 col-md ">
                      <div className="d-flex justify-content-end ">
                        <a href="#">view all</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="col-8 col-md">
                      <h5 className='m-0'>College of Computer Studies (CCS)</h5>
                    </div>

                    <div className="col-4 col-md">
                      <div className="d-flex justify-content-end">
                        <div className="dropdown">
                          <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">Right</a></li>
                            <li><a className="dropdown-item" href="#">Left</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-12 col-md-8 d-flex mt-3'>
                  <div className='card flex-fill border-0'>
                    <div className="card-body p-5">
                      {/* insert chart 1 */}
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>

                <div className="row mt-4">
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="col-8 col-md">
                      <h5 className='m-0'>Graduate Dormitory</h5>
                    </div>

                    <div className="col-4 col-md">
                      <div className="d-flex justify-content-end">
                        <div className="dropdown">
                          <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">RIght</a></li>
                            <li><a className="dropdown-item" href="#">Left</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-12 col-md-8 d-flex mt-3'>
                  <div className='card flex-fill border-0'>
                    <div className="card-body p-5">
                      {/* insert chart 2 */}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </main>


        </div>
      </div>

    </div>

  )
}

export default Dashboard