// REACT
import React, { useEffect, useState } from "react";
//REACT-ROUTER-DOM
import { Link } from "react-router-dom";
//REACT-REDUX
import { useDispatch, useSelector } from "react-redux";

//SLICES
import { createPerson, changeState } from "../personSlice";

//REACT-BOOTSTRAP
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//REACT-ICONS
import { AiOutlineArrowLeft } from "react-icons/ai";
//REACT-HOT-TOAST
import toast, { Toaster } from "react-hot-toast";
//CSS
import "./styles/Register.css";

const valueDefault = {
  name: "",
  lastName: "",
  email: "",
  cellPhone: "",
};

const Register = () => {
  const notify = () =>
    toast.success("¡Sus datos han registrados satisfactoriamente!");

  const dispatch = useDispatch();
  const [person, setPerson] = useState(valueDefault);

  const verification = useSelector((state) => state.person.verification);

  useEffect(() => {
    if (verification === true) {
      notify();
      dispatch(changeState(false));
    }
  }, [verification, dispatch]);

  const onChange = (e) => {
    setPerson({
      ...person,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPerson({
        name: person.name,
        lastName: person.lastName,
        email: person.email,
        cellPhone: person.cellPhone,
      })
    );
    clearForm();
  };

  const clearForm = () => {
    setPerson(valueDefault);
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
      <Toaster />
    </>
  );
};

export default Register;
