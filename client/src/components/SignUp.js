import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signupimage from "../images/signup.webp";

const SignUpPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [serverResponse, setServerResponse] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");
    const navigate = useNavigate();

    const submitForm = (data) => {
        if (data.password === data.confirmPassword) {
            const body = {
                username: data.username,
                email: data.email,
                password: data.password,
            };

            localStorage.setItem("body", JSON.stringify(body))

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };

            fetch("/auth/signup", requestOptions)
                .then(res => res.json())
                .then(data => {
                    setServerResponse(data.message);
                    setAlertVariant((data.status === "success") ? "success" : "danger");

                    if (data.status === "success") {
                        // Navigate to OTP verification page with email
                        navigate("/verify-otp", { state: { email: body.email } });
                    }
                })
                .catch(err => {
                    console.error(err);
                    setServerResponse("Something went wrong. Please try again.");
                    setAlertVariant("danger");
                });

            reset();
        } else {
            setServerResponse("Passwords do not match");
            setAlertVariant("danger");
        }
    };

    return (
        <main>
            <div className="hero form">
                <img src={signupimage} alt="Signup" loading="lazy" data-aos="zoom-out" />
                <div className="container d-flex flex-column form-card">
                    {serverResponse && (
                        <Alert 
                            variant={alertVariant} 
                            onClose={() => setServerResponse("")} dismissible
                            >
                            {serverResponse}
                        </Alert>
                    )}
                    <h1 className="heading">Sign Up</h1>
                    <Form className="lead text-start" onSubmit={handleSubmit(submitForm)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("username", { required: true, maxLength: 25 })}
                            />
                            {errors.username && <small style={{ color: "red" }}>Username is required</small>}
                            {errors.username?.type === "maxLength" && (
                                <small style={{ color: "red" }}>Max characters should be 25</small>
                            )}
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                {...register("email", { required: true, maxLength: 80 })}
                            />
                            {errors.email && <small style={{ color: "red" }}>Email is required</small>}
                            {errors.email?.type === "maxLength" && (
                                <small style={{ color: "red" }}>Max characters should be 80</small>
                            )}
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register("password", { required: true, minLength: 8 })}
                            />
                            {errors.password && <small style={{ color: "red" }}>Password is required</small>}
                            {errors.password?.type === "minLength" && (
                                <small style={{ color: "red" }}>Min characters should be 8</small>
                            )}
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register("confirmPassword", { required: true, minLength: 8 })}
                            />
                            {errors.confirmPassword && <small style={{ color: "red" }}>Confirm Password</small>}
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Button variant="outline-light" type="submit">
                                Sign Up
                            </Button>
                        </Form.Group>
                        <br />
                    </Form>
                    <small className="option">
                        Already have an account? <Link to="/login">Login</Link>
                    </small>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;