import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <Row>
        <Col md="auto">
          <Link to="/register" className="btn btn-outline-primary">
            Registrarse
          </Link>
        </Col>
        <Col md="auto">
          <Link to="/login" className="btn btn-outline-primary">
            Iniciar Sesión
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Login;
