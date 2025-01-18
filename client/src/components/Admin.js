import React, {useEffect, useState} from "react";
import { Modal, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const AdminHome = ()=>{

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

    const getAllJobs=()=>{
        fetch("/job/jobs")
            .then(res=>res.json())
            .then(data=>{
                setJobs(data)
            })
            .catch(err=>console.log(err))
    }

    const closeModal=()=>{
        setShow(false)
    }

    const showModal=(id)=>{
        setShow(true)
        setJobId(id)

        jobs.map(
            (job)=>{
                if(job.id === id){
                    setValue("title",job.title)
                    setValue("description",job.description)
                    setValue("salary",job.salary)
                    setValue("job_type",job.job_type)
                    setValue("link",job.link)
                }
            }
        )
    }

    let token=localStorage.getItem("REACT_TOKEN_AUTH_KEY")

    const updateJob=(data)=>{

        const requestOptions={
            method:"PUT",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }

        fetch(`/job/job/${jobId}`,requestOptions)
        .then(res=>res.json())
        .then(data=>{            
            const reload = window.location.reload()
            reload()
        })
        .catch(err=>console.log(err))
    }

    const deleteJob=(id)=>{
        const requestOptions={
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${JSON.parse(token)}`
            }
        }

        fetch(`/job/job/${id}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            getAllJobs()
        })
        .catch(err=>{console.log(err)})
    
    }

    const EditJob=({title,description,onClick,onDelete})=>{
        return (
            <Card className="job">
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <p>{description}</p>
                    <Button variant="primary" onClick={onClick}>Update</Button>
                    {" "}
                    <Button variant="danger " onClick={onDelete}>Delete</Button>
                </Card.Body>
            </Card>
        )
    }

    return (
        <main className="home container">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
                className="text-dark"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Job
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                {...register("title", {required:true,maxLength:50})}
                            />
                        </Form.Group>
                        {errors.title && <p style={{color:"red"}}><
                            small>Title is required</small></p>}
                        {errors.title?.type==="maxLength" && <p style={{color:"red"}}>
                            <small>Title should be less than 50 characters</small></p>}
                        <br></br>
                        <Form.Group>
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("salary", {
                                    required: "This field is required",
                                    validate: (value) =>
                                        /^[0-9]+$/.test(value) || "Only numeric values are allowed"
                                })}
                            />
                            {errors.salary && (
                                <span style={{ color: "red", fontSize: "small" }}>
                                    {errors.salary.message}
                                </span>
                            )}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Job Type</Form.Label>
                            <Form.Select
                                {...register("job_type", {
                                    required:true
                                })}
                            >
                                <option value="">Select Job Type</option>
                                <option value="remote">Remote</option>
                                <option value="onsite">Onsite</option>
                            </Form.Select>
                            {errors.job_type && (
                                <span style={{ color: "red", fontSize: "small" }}>
                                    "Please select a job type"
                                </span>
                            )}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="text"
                                {...register("link", {required:true})}
                            />
                        </Form.Group>
                        {errors.link && <p style={{color:"red"}}><
                            small>This field is required</small></p>}
                        <br></br>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={"textarea"} rows={5}
                                {...register("description", {required:true})}
                            />
                        </Form.Group>
                        {errors.description && <p style={{color:"red"}}><
                            small>description is required</small></p>}
                        <br></br>
                        <Form.Group>
                            <Button variant="primary" onClick={handleSubmit(updateJob)}>Save</Button>
                        </Form.Group>
                    </form>
                </Modal.Body>

            </Modal>
            <Link to="/create-job">Create Jobs</Link>
            <h1>List of Jobs</h1>
            {
                jobs.map(
                    (job,index)=>(
                        <EditJob 
                            title={job.title} 
                            key={index}
                            // description={job.description}
                            onClick={()=>{showModal(job.id)}}
                            onDelete={()=>{deleteJob(job.id)}}
                        />
                    )
                )
            }
        </main>
    )
}

export default AdminHome;