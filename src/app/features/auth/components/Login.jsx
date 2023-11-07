import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";
/*
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../actions/authActions";
*/
import "./styles/Login.css";

const Login = () => {
  /*const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/dashboard");
    }
  });

  const [userData, setUserData] = useState({
    usuario: "",
    contrasenia: "",
  });
*/
  const onChange = (e) => {
    //setUserData({
    //  ...userData,
    //  [e.target.id]: e.target.value,
    //});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("first");
    //dispatch(loginUser(userData));
  };

  return (
    <>
      <Container className="LogContainer">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <AiOutlineArrowLeft /> Volver a inicio
            </Link>
            <Col>
              <h4>
                <b>Inicie sesión</b> a continuación
              </h4>
              <p>
                ¿No tienes una cuenta?{" "}
                <Link to="/register" style={{ textDecoration: "inherit" }}>
                  Regístrate
                </Link>
              </p>
            </Col>
            <Form noValidate onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  onChange={onChange}
                  //value={this.state.email}
                  id="usuario"
                  type="text"
                  placeholder="Ejm andhern"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  onChange={onChange}
                  //value={this.state.password}
                  id="contrasenia"
                  type="password"
                  placeholder="Ejm *** *** **"
                />
              </Form.Group>
              <hr />
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
