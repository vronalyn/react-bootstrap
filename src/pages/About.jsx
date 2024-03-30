import React from 'react'

const About = () => {
    return (
        <div>
            <section className='vh-100 bg-white'>
                <div className='container vh-100 d-flex justify-content-center align-items-center'>
                    <div className='row column-gap-3'>
                        <div className='col-md p-4 border rounded-4'>
                            <h1>Objective</h1>
                            <p>
                                Our project aims to revolutionize the way water usage is monitored and managed on the MSU-IIT campus.
                                By leveraging the power of IoT technology and a user-friendly web application,
                                we strive to promote sustainable water usage practices and raise awareness about water conservation.
                            </p>
                        </div>
                        <div className='col-md p-4 border rounded-4'>
                            <h1>Mission</h1>
                            <p>
                                Our mission is to empower the MSU-IIT community to make informed decisions
                                about their water usage through real-time monitoring and data-driven insights.
                                We are committed to promoting water conservation, reducing waste,
                                and fostering a culture of sustainability on campus.
                            </p>
                        </div>
                        <div className='col-md p-4 border rounded-4'>
                            <h1>Vision for the Future</h1>
                            <p>
                                Our vision is to expand the reach of our water consumption
                                monitoring system beyond MSU-IIT,
                                making it accessible to other educational institutions,
                                businesses, and communities. Together,
                                we can work towards a more sustainable future for all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About