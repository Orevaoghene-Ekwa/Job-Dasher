import React from "react";
import {Card} from "react-bootstrap";


export const Job=({title,description,date})=>{
    return (
        <Card className="job">
            <Card.Body>
                <small>{date}</small>
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
            </Card.Body>
        </Card>
    )
}

export default Job