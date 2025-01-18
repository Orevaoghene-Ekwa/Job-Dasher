import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState("");
    const [serverResponse, setServerResponse] = useState("Please check your email for an OTP to complete your signup.");
    const [alertVariant, setAlertVariant] = useState("success");
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const body = JSON.parse(localStorage.getItem("body"));
            if (body && body.email && body.username && body.password) {
                setUserDetails(body);
            } else {
                throw new Error("Invalid user data in localStorage");
            }
        } catch (error) {
            console.error("Error parsing user details:", error);
            setServerResponse("User details are missing or invalid. Please restart the signup process.");
            setAlertVariant("danger");
        }
    }, []);

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        if (!userDetails) {
            setServerResponse("User details are not available.");
            setAlertVariant("danger");
            return;
        }

        const { email, username, password } = userDetails;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, username, password }),
        };

        fetch("/auth/verify-otp", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setServerResponse(data.message);
                if (data.success) {
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.error(err);
                setServerResponse("Something went wrong. Please try again.");
                setAlertVariant("danger");
            });
    };

    return (
        <main className="container py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center mb-4">Verify OTP</h1>
                    {serverResponse && (
                        <Alert
                            variant={alertVariant}
                            onClose={() => setServerResponse("")}
                            dismissible
                        >
                            {serverResponse}
                        </Alert>
                    )}
                    <Form onSubmit={handleOtpSubmit}>
                        <Form.Group>
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="Enter the OTP sent to your email"
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-4">
                            <Button variant="primary" type="submit">
                                Verify
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </main>
    );
};

export default VerifyOtpPage;
