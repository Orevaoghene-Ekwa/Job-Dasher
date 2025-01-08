import React, {useState} from "react";
import {Form, Button, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import signupimage from "../images/signup.webp";

const SignUpPage=()=>{

    const {register,handleSubmit, reset,formState:{errors}} = useForm();
    const [show,setShow]=useState(false)
    const [serverResponse,setServerResponse]=useState('')

    const submitForm = (data)=>{

        if(data.password === data.confirmPassword){

            const body = {
                username:data.username,
                email:data.email,
                password:data.password
            }

            const requestOptions={
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(body)
            }
    
            fetch("/auth/signup",requestOptions)
            .then(res=>res.json())
            .then(data=>{
                setServerResponse(data.message)
                setShow(true)
            })
            // .catch(err=>{console.log(err)})
    
            reset()
        }
        else{
            setServerResponse("Passwords do not match")
            setShow(true)
        }
    }

    return(
        <main className="">
            <div className="hero form ">
                <img src={signupimage} alt="" loading="lazy" data-aos="zoom-out"/>
                <div className="container d-flex flex-column">

                    {show?
                        <>
                            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                                <p>
                                    {serverResponse}
                                </p>
                            </Alert>
                            <h1>Sign Up</h1>
                        </>
                        :
                        <h1 className="heading">Sign Up</h1>
                    }
                    <Form className="lead text-start">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" 
                                placeholder="userxyz"
                                {...register("username",{required:true,maxLength:25})}
                            />
                            {errors.username && <small style={{color:"red"}}>Username is required</small>}
                            {errors.username?.type==="maxLength" && <small style={{color:"red"}}>Max characters should be 25</small>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" 
                                placeholder="email@example.com"
                                {...register("email",{required:true,maxLength:80})}
                            />
                            {errors.email && <small style={{color:"red"}}>Email is required</small>}
                            {errors.email?.type==="maxLength" && <small style={{color:"red"}}>Max characters should be 80</small>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                {...register("password",{required:true,minLength:8})}
                                />
                            {errors.password && <small style={{color:"red"}}>Password is required</small>}
                            {errors.password?.type==="minLength" && <small style={{color:"red"}}>Min characters should be 8</small>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" 
                                {...register("confirmPassword",{required:true,minLength:8})}
                                />
                            {errors.confirmPassword && <small style={{color:"red"}}>Confim Password</small>}
                            <br></br>
                        </Form.Group>
                        <Form.Group>
                            <Button 
                                variant="outline-light"
                                type="submit"
                                onClick={handleSubmit(submitForm)}
                                >
                                    Sign Up
                            </Button>
                        </Form.Group>
                        <br></br>
                    </Form>
                    <small className="option">Already have an account? <Link to="/login">Login</Link></small>
                </div>
            </div>
        </main>
    )
}

export default SignUpPage