import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";

import "./styles/Register.css";

const valueDefault = {
  name: "",
  lastName: "",
  email: "",
  cellPhone: "",
};

const Register = () => {
  const [person, setPerson] = useState(valueDefault);

  const onChange = (e) => {
    setPerson({
      ...person,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(person);
  };

  return (
    <>
      <Container className="AuthRegisContainer">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <AiOutlineArrowLeft />
              Volver a inicio
            </Link>
            <Col>
              <h4>
                <b>Regístrate</b> a continuación
              </h4>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" style={{ textDecoration: "inherit" }}>
                  Iniciar sesión
                </Link>
              </p>
            </Col>
            <Form noValidate onSubmit={onSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={person.name}
                      id="name"
                      type="text"
                      placeholder="Ejm Manuel Andrés "
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={person.lastName}
                      id="lastName"
                      type="text"
                      placeholder="Ejm Hernandez Cortés"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={person.email}
                      id="email"
                      type="email"
                      placeholder="Ejm correo@mail.com"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={person.cellPhone}
                      id="cellPhone"
                      type="text"
                      placeholder="Ejm 099 999 9999"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Button variant="primary" type="submit">
                  Guardar los cambios
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
