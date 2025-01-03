import React, {useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../auth";
import {useNavigate} from "react-router-dom";

const LoginPage=()=>{

    const {register,handleSubmit,reset,formState:{errors}}=useForm()
    const [show,setShow]=useState(false)
    const [serverResponse,setServerResponse]=useState('')

    const navigate = useNavigate()

    const loginUser=(data)=>{
        const requestOptions={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        }

        fetch("/auth/login",requestOptions)
        .then(res=>res.json())
        .then(data=>{
            login(data.access_token)
            if (data.role === "admin"){
                navigate("/admin")
            }
            else {
                navigate("/")
            }
        })
        .catch(err=>{
            setServerResponse("Incorrect email or password")
            setShow(true)
        })

        reset()
    }
    return(
        <main className="container">
            <div className="form">
                {show?
                    <>
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>Login</h1>
                    </>
                    :
                    <h1>Login</h1>
                }
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" 
                            placeholder=""
                            {...register('email', {required:true,maxLength:80})}
                        />
                        {errors.email && <p style={{color:"red"}}><small>enter a valid email</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            {...register('password', {required:true})}
                            />
                        {errors.password && <p style={{color:"red"}}><small>password is required</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button 
                            type="submit"
                            variant="primary" 
                            onClick={handleSubmit(loginUser)}
                            >
                                Login
                            </Button>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <small>Don't have an account? <Link to="/signup">Create an account</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </main>
    )
}

export default LoginPage