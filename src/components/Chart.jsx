import React from 'react'

function Chart() {
    return (
        <div className="card widget-card border-light shadow-sm">
            <div className="card-body p-4">
                <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
                    <div className="mb-3 mb-sm-0">
                        <h5 className="card-title widget-card-title">College of Computer Studies</h5>
                    </div>
                    <div>
                        <select className="form-select text-secondary border-light-subtle ">
                            <option selected>Right Tank</option>
                            <option value="1">Left Tank</option>
                        </select>
                    </div>
                </div>
                <div id="bsb-chart-1">
                </div>
            </div>
        </div>
    )
}

export default Chart