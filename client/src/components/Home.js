import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Job from "./Job";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";



const LoggedInHome = ()=>{

    const [jobs,setJobs]=useState([]);
    const [show,setShow]=useState(false);
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();
    const [jobId,setJobId]=useState(0);

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


    return (
        <div className="home container">
            {/* Modal area */}
            <h1>List of Jobs</h1>
            {
                jobs.map(
                    (job,index)=>(
                        <Job 
                            title={job.title} 
                            key={index}
                            description={job.description}
                        />
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
            {/* {logged ? (isAdmin ? <AdminHome /> : <LoggedInHome />) : <LoggedOutHome />} */}
        </div>
    )
}

export default HomePage;
