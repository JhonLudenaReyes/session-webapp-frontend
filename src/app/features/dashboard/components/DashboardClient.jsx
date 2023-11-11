import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/DashboardClient.css";

const DashboardClient = () => {
  return (
    <>
      <Container fluid className="DashClientContainer">
        <Row className="StylesRow">
          <h1 className="text-center">
            <b>Bienvenido a ventana principal para clientes...</b>
          </h1>
        </Row>
      </Container>
    </>
  );
};

export default DashboardClient;
