import React from 'react'

function Chart() {
    return (
        <div class="card widget-card border-light shadow-sm">
            <div class="card-body p-4">
                <div class="d-block d-sm-flex align-items-center justify-content-between mb-3">
                    <div class="mb-3 mb-sm-0">
                        <h5 class="card-title widget-card-title">College of Computer Studies</h5>
                    </div>
                    <div>
                        <select class="form-select text-secondary border-light-subtle ">
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