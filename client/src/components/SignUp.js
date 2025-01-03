import React, {useState} from "react";
import {Form, Button, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";

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
        <main className="container">
            <div className="form">

                {show?
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>Sign Up Page</h1>
                    </>
                    :
                    <h1>Sign Up Page</h1>
                }
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" 
                            placeholder="userxyz"
                            {...register("username",{required:true,maxLength:25})}
                        />
                        {errors.username && <p style={{color:"red"}}><small>Username is required</small></p>}
                        {errors.username?.type==="maxLength" && <p style={{color:"red"}}><small>Max characters should be 25</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" 
                            placeholder="email@example.com"
                            {...register("email",{required:true,maxLength:80})}
                        />
                        {errors.email && <p style={{color:"red"}}><small>Email is required</small></p>}
                        {errors.email?.type==="maxLength" && <p style={{color:"red"}}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            {...register("password",{required:true,minLength:8})}
                            />
                        {errors.password && <p style={{color:"red"}}><small>Password is required</small></p>}
                        {errors.password?.type==="minLength" && <p style={{color:"red"}}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                            {...register("confirmPassword",{required:true,minLength:8})}
                            />
                        {errors.confirmPassword && <p style={{color:"red"}}><small>Confim Password</small></p>}
                        <br></br>
                        {errors.confirmPassword?.type==="minLength" && <p style={{color:"red"}}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit"
                            onClick={handleSubmit(submitForm)}
                            >
                                Sign Up
                        </Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Already have an account? <Link to="/login">Login</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </main>
    )
}

export default SignUpPage