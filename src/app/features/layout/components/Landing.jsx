import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/Landing.css";

const Landing = () => {
    return (
        <>
            <Container fluid className="LandContainer">
                <Row className="StylesRow">
                    <h1 className="text-center">
                        <b>Sistema web Seroficom...</b>
                    </h1>
                </Row>
            </Container>
        </>
    );
};

export default Landing;
