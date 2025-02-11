import React from "react";
import { Form,Button } from "react-bootstrap";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateJobPage=()=>{

    const {register,handleSubmit,reset,formState:{errors}}=useForm()
    const navigate = useNavigate()

    const createJob=(data)=>{
        
        const token=localStorage.getItem("REACT_TOKEN_AUTH_KEY");

        const requestOptions={
            method:"POST",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }

        fetch('/job/jobs',requestOptions)
        .then(res=>res.json())
        .then(data=>{
            reset()
            navigate("/")
        })
        .catch(err=>console.log(err))
    }

    return(
        <main className="container">
            <h1>Create A Job</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                        {...register("title", {required:true,maxLength:100})}
                    />
                </Form.Group>
                {errors.title && <p style={{color:"red"}}><
                    small>This field is required</small></p>}
                {errors.title?.type==="maxLength" && <p style={{color:"red"}}>
                    <small>Title should be less than 25 characters</small></p>}
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
                    small>This field is required</small></p>}
                <br></br>
                <Form.Group>
                    <Button 
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit(createJob)}
                        >
                            Save
                        </Button>
                </Form.Group>
            </Form>
        </main>
    )
}

export default CreateJobPage