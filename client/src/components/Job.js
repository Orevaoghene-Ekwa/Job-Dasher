import React from "react";
import { Card } from "react-bootstrap";

export const Job = ({ title, description, date, job_type, link, salary }) => {
    // Format date and salary
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedSalary = salary ? `$${salary.toLocaleString()}` : "Not specified";

    return (
        <Card className="job my-3 shadow-sm">
            <Card.Body>
                <small className="text-muted">{formattedDate}</small>
                <Card.Title className="mt-2">{title}</Card.Title>
                <p><strong>Salary:</strong> {formattedSalary}</p>
                <p>
                    <strong>Apply here:</strong>{" "}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                </p>
                <p>{description}</p>
                <small className="text-muted">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="currentColor"
                    >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>{" "}
                    {job_type}
                </small>
            </Card.Body>
        </Card>
    );
};

export default Job;


// import React from "react";
// import {Card} from "react-bootstrap";


// export const Job=({title,description,date,job_type,link,salary})=>{
//     return (
//         <Card className="job">
//             <Card.Body>
//                 <small>{date}</small>
//                 <Card.Title>{title}</Card.Title>
//                 <p>{salary}</p>
//                 <p>{link}</p>
//                 <p>{description}</p>
//                 <small>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
//                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                     </svg>: {job_type}
//                 </small>
//             </Card.Body>
//         </Card>
//     )
// }

// export default Job