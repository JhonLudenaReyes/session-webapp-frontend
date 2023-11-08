import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/dashboardAdmin.css";

const dashboardAdmin = () => {
  return (
    <>
      <Container fluid className="DashAdminContainer">
        <Row className="StylesRow">
          <h1 className="text-center">
            <b>Sistema web Seroficom...</b>
          </h1>
        </Row>
      </Container>
    </>
  );
};

export default dashboardAdmin;
