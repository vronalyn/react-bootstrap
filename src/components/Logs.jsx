import React from 'react'

const Logs = () => {
    return (
        <div class="card widget-card border-light shadow-sm">
            <div class="card-body p-4">
                <h5 class="card-title widget-card-title mb-4">Activity Logs</h5>
                <div class="row gy-4">
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 class="m-0">Bill Rate Changed</h6>
                                        <p class="text-secondary m-0 fs-7">Mar 4, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <h6 class="text-end text-muted fs-7">9:00 am</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 class="m-0">Added User</h6>
                                        <p class="text-secondary m-0 fs-7">Feb 1, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <h6 class="text-end text-muted fs-7">3:30 pm</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 class="m-0">Goal set to 1000 L</h6>
                                        <p class="text-secondary m-0 fs-7">Feb 1, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <h6 class="text-end text-muted fs-7">3:00 pm</h6>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Logs