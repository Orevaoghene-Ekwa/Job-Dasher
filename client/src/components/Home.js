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
        <div className="hero">
            <img src={heroimage} alt="" loading="lazy" data-aos="flip-left"/>
            <div className="container d-flex flex-column">
                <h1 className="heading" data-aos="fade-up" data-aos-delay="100">
                    Welcome to Job Dasher
                </h1>
                <p className="lead" data-aos="fade-up" data-aos-delay="200">
                    Where opportunities and talents meet.
                </p>
                <p className="" data-aos="fade-down" data-aos-delay="300">
                    <Link to="signup" className="btn btn-outline-light btn-lg">
                        Get Started
                    </Link>
                    <br />
                </p>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [logged] = useAuth();
    return <main>{logged ? <LoggedInHome /> : <LoggedOutHome />}</main>;
};

export default HomePage;
