import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Job from "./Job";
import { Modal } from "react-bootstrap";

const LoggedInHome = () => {
    const [jobs, setJobs] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetch("/job/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((err) => console.error("Error fetching jobs:", err));
    }, []);

    const closeModal = () => setShow(false);

    const showModal = (id) => {
        const job = jobs.find((job) => job.id === id);
        if (job) {
            setSelectedJob(job);
            setShow(true);
        }
    };

    return (
        <div className="home container">
            <Modal show={show} size="lg" onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedJob?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{selectedJob?.description}</Modal.Body>
            </Modal>
            <h1>Job Listings</h1>
            {jobs.length > 0 ? (
                jobs.map((job) => (
                    <div
                        onClick={() => showModal(job.id)}
                        key={job.id}
                        className="sub"
                        role="button"
                        style={{ cursor: "pointer" }}
                    >
                        <Job
                            title={job.title}
                            date={`Posted: ${job.date}`}
                            job_type={job.job_type}
                            salary={job.salary}
                            link={job.link}
                        />
                    </div>
                ))
            ) : (
                <p>Loading jobs...</p>
            )}
        </div>
    );
};

const LoggedOutHome = () => {
    return (
        <div className="container center-text hero">
            <h1 className="heading">Welcome to Job Dasher</h1>
            <p className="lead">Where opportunities and talents meet.</p>
            <p className="lead">
                <Link to="signup" className="btn btn-primary btn-lg">
                    Get Started
                </Link>
                <br />
            </p>
        </div>
    );
};

const HomePage = () => {
    const [logged] = useAuth();
    return <main>{logged ? <LoggedInHome /> : <LoggedOutHome />}</main>;
};

export default HomePage;



// import React, {useEffect, useState} from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../auth";
// import Job from "./Job";
// import { Modal } from "react-bootstrap";


// const LoggedInHome = ()=>{


//     const [jobs,setJobs]=useState([]);
//     const [show,setShow]=useState(false);
//     const [title,setTitle]=useState([])
//     const [description,setDescription]=useState([])

//     useEffect(
//         ()=>{
//             fetch("/job/jobs")
//             .then(res=>res.json())
//             .then(data=>{
//                 setJobs(data)
//             })
//             .catch(err=>console.log(err))
//         },[]
//     );


//     const closeModal=()=>{
//         setShow(false)
//     }

//     const showModal=(id)=>{
//         setShow(true)

//         jobs.map(
//             (job)=>{
//                 if(job.id === id){
//                     setTitle(job.title)
//                     setDescription(job.description)
//                 }
//             }
//         )
//     }




//     return (
//         <div className="home container">
//             <Modal
//                 show={show}
//                 size="lg"
//                 onHide={closeModal}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>
//                         {title}
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Modal.Body>
//                         {description}
//                     </Modal.Body>
//                 </Modal.Body>

//             </Modal>
//             <h1>Job Listings</h1>
//             {
//                 jobs.map(
//                     (job,index)=>(
//                         <Link 
//                             onClick={()=>{showModal(job.id)}}
//                             key={index}
//                             className="sub"
//                             >
//                         <Job 
//                             title={job.title} 
//                             key={index}
//                             date={"Posted: "+job.date}
//                             type={job.job_type}
//                         />
//                         </Link>
//                     )
//                 )
//             }
//         </div>
//     )
// }

// const LoggedOutHome = ()=>{
//     return(
//         <div className="container center-text hero">
//             <h1 className="heading">Welcome to Job Dasher</h1>
//             <p class="lead">where opportunities and talents meet.</p>
//             <p class="lead">
//             <Link to="signup" className="btn btn-primary btn-lg">Get Started</Link>
//             <br></br>
//             </p>
//         </div>
//     )
// }


// const HomePage=()=>{
//     const [logged]=useAuth()
//     return(
//         <main>
//             {logged ? <LoggedInHome /> : <LoggedOutHome />}
//         </main>
//     )
// }

// export default HomePage;
