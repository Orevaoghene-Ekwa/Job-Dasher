import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Job from "./Job";
import { Modal } from "react-bootstrap";


const LoggedInHome = ()=>{


    const [jobs,setJobs]=useState([]);
    const [show,setShow]=useState(false);
    const [title,setTitle]=useState([])
    const [description,setDescription]=useState([])

    useEffect(
        ()=>{
            fetch("/job/jobs")
            .then(res=>res.json())
            .then(data=>{
                setJobs(data)
            })
            .catch(err=>console.log(err))
        },[]
    );


    const closeModal=()=>{
        setShow(false)
    }

    const showModal=(id)=>{
        setShow(true)

        jobs.map(
            (job)=>{
                if(job.id === id){
                    setTitle(job.title)
                    setDescription(job.description)
                }
            }
        )
    }




    return (
        <div className="home container">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        {description}
                    </Modal.Body>
                </Modal.Body>

            </Modal>
            <h1>List of Jobs</h1>
            {
                jobs.map(
                    (job,index)=>(
                        <Link 
                            onClick={()=>{showModal(job.id)}}
                            key={index}
                            className="sub"
                            >
                        <Job 
                            title={job.title} 
                            key={index}
                            // description={job.description}
                            date={"Posted:time_of_posting"}
                        />
                        </Link>
                    )
                )
            }
        </div>
    )
}

const LoggedOutHome = ()=>{
    return(
        <div className="container center-text">
            <main className="hero">
                <h1 className="heading">Find the Latest Job postings With Ease</h1>
                <p class="lead">Create an account to gain access to our list of jobs.</p>
                <p class="lead">
                <Link to="signup" className="btn btn-primary btn-lg">Get Started</Link>
                <br></br>
                </p>
            </main>
        </div>
    )
}


const HomePage=()=>{
    const [logged]=useAuth()
    return(
        <div>
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>
    )
}

export default HomePage;
