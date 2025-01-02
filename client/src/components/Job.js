import React from "react";
import {Card} from "react-bootstrap";


export const Job=({title,description,date})=>{
    return (
        <Card className="job">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <small>{date}</small>
                <p>{description}</p>
            </Card.Body>
        </Card>
    )
}

export default Job