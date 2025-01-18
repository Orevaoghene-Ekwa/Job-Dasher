import React from "react";
import aboutimage from "../images/about.webp";

const AboutPage = () => {
    return (
        <main className="about-bg">
            {/* Hero Section */}
            <div className="hero ">
                <img
                    src={aboutimage}
                    alt="About Job Dasher"
                    // className="img-fluid"
                    loading="lazy"
                    data-aos="zoom-in"
                    // style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <div className="container text-center text-white position-absolute top-50 start-50 translate-middle">
                    <h1 className="display-4 fw-bold" data-aos="fade-up" data-aos-delay="100">
                        About Job Dasher
                    </h1>
                    <p className="lead" data-aos="fade-up" data-aos-delay="200">
                        Simplifying Job Management, One Post at a Time
                    </p>
                </div>
            </div>

            {/* About Section */}
            <div className="content about py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2 className="fw-bold text-center mb-4">Welcome to Job Dasher</h2>
                            <p>
                                The ultimate platform designed to make job tracking and management easier, more efficient,
                                and accessible to everyone. Whether you're a professional looking for your next opportunity
                                or a recruiter managing multiple job openings, Job Dasher is here to empower you with the
                                tools you need.
                            </p>
                            <h3 className="mt-4">Our Mission</h3>
                            <p>
                                At Job Dasher, our mission is to bridge the gap between job seekers and job providers,
                                offering a seamless experience for both parties. We believe in the power of technology to
                                simplify complex processes and bring people closer to achieving their career goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Section */}
            <div className="content py-5">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4">Why Choose Job Dasher?</h2>
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <strong>User-Friendly Design:</strong> We've crafted an intuitive and responsive
                                    interface that ensures you can focus on what truly matters—connecting with
                                    opportunities.
                                </li>
                                <li className="mb-3">
                                    <strong>Streamlined Job Tracking:</strong> Keep tabs on job postings, applications,
                                    and statuses all in one place.
                                </li>
                                <li className="mb-3">
                                    <strong>Accessibility for All:</strong> Optimized for mobile and desktop use, Job Dasher
                                    fits your lifestyle and workflow.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="content about py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2 className="fw-bold text-center mb-4">Our Story</h2>
                            <p>
                                Job Dasher was born from a simple idea: to create a space where job seekers and recruiters
                                could connect effortlessly. Over the years, we’ve realized the challenges faced by both
                                groups—managing multiple job postings, tracking applications, or simply finding the right
                                match. That’s why we built a platform tailored to address these pain points with precision
                                and care.
                            </p>
                            <p>
                                Our team comprises tech enthusiasts, career coaches, and industry professionals committed
                                to making a difference in the job market. Every feature you see on Job Dasher is a product
                                of thoughtful design, feedback from users, and our unwavering dedication to excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="content  py-5">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4">Our Features at a Glance</h2>
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <strong>Job Creation & Posting:</strong> Recruiters can quickly create and publish job openings.
                        </li>
                        <li className="mb-3">
                            <strong>Seamless Browsing:</strong> Job seekers can explore and apply for jobs with ease.
                        </li>
                        <li className="mb-3">
                            <strong>Real-Time Updates:</strong> Stay informed with instant updates on job statuses.
                        </li>
                        <li className="mb-3">
                            <strong>Community-Centered Approach:</strong> We listen to our users, evolving with their needs.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className="content about py-5">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4">Contact Us</h2>
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <p>
                                Have questions or feedback? We'd love to hear from you! Reach out to us:
                            </p>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <strong>Email:</strong> jobdsher@gmail.com
                                </li>
                                <li className="mb-3">
                                    <strong>Phone Number:</strong> +2348142091431
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AboutPage;
