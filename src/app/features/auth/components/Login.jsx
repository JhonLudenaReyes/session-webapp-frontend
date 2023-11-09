import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { loginUser } from "../authSlice";

//import { useSelector } from "react-redux";

import "./styles/Login.css";

import { useDispatch, useSelector } from "react-redux";

const valueDefault = {
  user: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(valueDefault);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/dashboard");
    }
  });

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  /*const getLoginUser = async (user) => {
    const userLogin = await axios.post(
      `http://127.0.0.1:4449/users/session/login`,
      user
    );
    console.log(userLogin.data);
  };*/

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
                  value={user.user}
                  id="user"
                  type="text"
                  placeholder="Ejm andhern"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  onChange={onChange}
                  value={user.password}
                  id="password"
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
