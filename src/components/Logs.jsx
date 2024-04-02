import React from 'react'

const Logs = () => {
    return (
        <div className="card widget-card border-light shadow-sm">
            <div className="card-body p-4">
                <h5 className="card-title widget-card-title mb-4">Activity Logs</h5>
                <div className="row gy-4">
                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 className="m-0">Bill Rate Changed</h6>
                                        <p className="text-secondary m-0 fs-7">Mar 4, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h6 className="text-end text-muted fs-7">9:00 am</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 className="m-0">Added User</h6>
                                        <p className="text-secondary m-0 fs-7">Feb 1, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h6 className="text-end text-muted fs-7">3:30 pm</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 className="m-0">Goal set to 1000 L</h6>
                                        <p className="text-secondary m-0 fs-7">Feb 1, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h6 className="text-end text-muted fs-7">3:00 pm</h6>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Logs