import React from 'react'

const Cards = () => {
    return (

        <section className="py-2 py-md-3">

            <div className="row">
                <div className="col-12">
                    <div className="row gy-2">
                        <div className="col-12 col-sm-4">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="card-title widget-card-title fs-6 mb-3">Usage</h5>
                                            <h4 className="card-subtitle text-body-secondary m-0">1,000 L</h4>
                                        </div>
                                        <div className="col-4">
                                            <div className="d-flex justify-content-end">
                                                <div className="lh-1 text-white bg-info-cstm rounded-circle p-3 d-flex align-items-center justify-content-center">
                                                    <i className="bx bx-droplet fs-4"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex align-items-center mt-3">
                                                <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-arrow-down-short"></i>
                                                </span>
                                                <div>
                                                    <p className="badge text-danger p-0 fs-7 mb-0">-9%</p><br />
                                                    <p className="fs-7 mb-0 badge text-secondary p-0">since last week</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="card-title widget-card-title fs-6 mb-3">Bill</h5>
                                            <h4 className="card-subtitle text-body-secondary m-0">$21,900</h4>
                                        </div>
                                        <div className="col-4">
                                            <div className="d-flex justify-content-end">
                                                <div className="lh-1 text-white bg-info-cstm rounded-circle p-3 d-flex align-items-center justify-content-center">
                                                    <i className='bx bx-receipt fs-4'></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex align-items-center mt-3">
                                                <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-arrow-down-short bsb-rotate-45"></i>
                                                </span>
                                                <div>
                                                    <p className="badge text-danger p-0 fs-7 mb-0">-20%</p><br />
                                                    <p className="fs-7 mb-0 badge text-secondary p-0">since last week</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="card-title widget-card-title fs-6 mb-3">Goal</h5>
                                            <h4 className="card-subtitle text-body-secondary m-0">2,000 L</h4>
                                        </div>
                                        <div className="col-4">
                                            <div className="d-flex justify-content-end">
                                                <div className="lh-1 text-white bg-info-cstm rounded-circle p-3 d-flex align-items-center justify-content-center">
                                                    <i class='bx bx-target-lock fs-4' ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex align-items-center mt-3">
                                                <span className="lh-1 me-3 bg-warning-subtle text-warning rounded-circle p-1 d-flex align-items-center justify-content-center">
                                                    <i className="bx bxs-error-circle fs-5"></i>
                                                </span>
                                                <div>
                                                    <p className="badge text-warning p-0 fs-7 mb-0">50%</p><br />
                                                    <p className="fs-7 mb-0 badge text-secondary p-0">as of 2:15 pm</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Cards