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
                            date={"posted:time_of_posting"}
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
        <div className="home container">
            <h1 className="heading">Welcome to JobDasher</h1>
            <br></br>
            <Link to="signup" className="btn btn-primary btn-lg">Get Started</Link>
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
