import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/DashboardAdmin.css";

const DashboardAdmin = () => {
  return (
    <>
      <Container fluid className="DashAdminContainer">
        <Row className="StylesRow">
          <h1 className="text-center">
            <b>Bienvenido al sistema de administración...</b>
          </h1>
        </Row>
      </Container>
    </>
  );
};

export default DashboardAdmin;
