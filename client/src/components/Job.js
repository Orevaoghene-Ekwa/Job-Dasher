import React from "react";
import { Button, Card} from "react-bootstrap";


const Job=({title,description,onClick,onDelete})=>{
    return (
        <Card className="job">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
                {/* <Button variant="primary" onClick={onClick}>Update</Button>
                {" "}
                <Button variant="danger " onClick={onDelete}>Delete</Button> */}
            </Card.Body>
        </Card>
    )
}

export default Job;