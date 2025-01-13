import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Job from "./Job";
import { Modal } from "react-bootstrap";
import heroimage from "../images/home.webp"

const LoggedInHome = () => {
    const [jobs, setJobs] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetch("/job/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((err) => console.error("Error fetching jobs:", err));
    }, []);

    const closeModal = () => setShow(false);

    const showModal = (id) => {
        const job = jobs.find((job) => job.id === id);
        if (job) {
            setSelectedJob(job);
            setShow(true);
        }
    };

    return (
        <div className="home container">
            <Modal show={show} size="lg" onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedJob?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Job Description</h5>
                    <br/>
                    <div style={{whiteSpace: 'pre-wrap'}}>{selectedJob?.description}</div>
                    <br/>
                    <br/>
                    <p>
                        <a href={selectedJob?.link} target="_blank" rel="noopener noreferrer">
                            <strong>Apply here:</strong>
                        </a>
                    </p>
                </Modal.Body>
            </Modal>
            <h1 style={{color:"black"}}>Job Listings</h1>
            {jobs.length > 0 ? (
                jobs.map((job) => (
                    <div
                        onClick={() => showModal(job.id)}
                        key={job.id}
                        className="sub"
                        role="button"
                        style={{ cursor: "pointer" }}
                    >
                        <Job
                            title={job.title}
                            date={`Posted: ${job.date}`}
                            job_type={job.job_type}
                            salary={job.salary}
                            link={job.link}
                        />
                    </div>
                ))
            ) : (
                <p>Loading jobs...</p>
            )}
        </div>
    );
};

const LoggedOutHome = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero landing-hero">
                <img src={heroimage} alt="" loading="lazy" data-aos="flip-left" />
                <div className="container d-flex flex-column pt-5">
                    <h1 className="heading pt-5" data-aos="fade-up" data-aos-delay="100">
                        Welcome to Job Dasher
                    </h1>
                    <p className="lead" data-aos="fade-up" data-aos-delay="200">
                        Where opportunities and talents meet.
                    </p>
                    <p data-aos="fade-down" data-aos-delay="300">
                        <Link to="signup" className="btn btn-outline-light btn-lg">
                            Get Started
                        </Link>
                        <br />
                    </p>
                </div>
            </div>

            {/* Key Features Section */}
            <div className="features container my-5" data-aos="fade-up">
                <h2 className="text-center mb-4">Why Choose Job Dasher?</h2>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 text-center mb-4">
                        <div className="icon-wrapper">
                            <i className="icon fas fa-briefcase fa-3x mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                </svg>
                            </i>
                        </div>
                        <h4 className="mt-3">Verified Listings</h4>
                        <p>All job opportunities are carefully vetted for authenticity.</p>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 text-center mb-4">
                        <div className="icon-wrapper">
                            <i className="icon fas fa-user-check fa-3x mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                                </svg>
                            </i>
                        </div>
                        <h4 className="mt-3">Tailored Matches</h4>
                        <p>Find jobs that match your skills and interests.</p>
                    </div>

                    <div className="col-12 col-lg-4 text-center">
                        <div className="icon-wrapper">
                            <i className="icon fas fa-bullseye fa-3x mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>
                            </i>
                        </div>
                        <h4 className="mt-3">Easy Applications</h4>
                        <p>Apply to jobs with just a few clicks.</p>
                    </div>
                </div>
            </div>


            {/* Testimonials Section */}
            <div className="testimonials container my-5" data-aos="fade-in">
                <h2 className="text-center mb-4">What Our Users Say</h2>
                <blockquote className="blockquote text-center">
                    <p className="mb-0">"Job Dasher helped me land my dream job in no time. Highly recommended!"</p>
                    <small className="blockquote-footer">Jane Doe, <cite title="Source Title">Software Engineer</cite></small>
                </blockquote>
            </div>

            {/* Call to Action Section */}
            <div className="cta bg-primary text-white text-center py-5" data-aos="fade-up">
                <h2>Ready to Kickstart Your Career?</h2>
                <Link to="signup" className="btn btn-light  mt-3">
                    Sign Up Now
                </Link>
            </div>
        </div>
    );
};


const HomePage = () => {
    const [logged] = useAuth();
    return <main>{logged ? <LoggedInHome /> : <LoggedOutHome />}</main>;
};

export default HomePage;
