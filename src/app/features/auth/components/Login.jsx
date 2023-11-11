import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { loginUser, changeErrorStatus } from "../authSlice";

import { useDispatch, useSelector } from "react-redux";

//REACT-HOT-TOAST
import toast, { Toaster } from "react-hot-toast";

import "./styles/Login.css";

const valueDefault = {
  user: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(valueDefault);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errorStatus = useSelector((state) => state.auth.errorStatus);
  const messageError = useSelector((state) => state.auth.messageError);
  const userStore = useSelector((state) => state.auth.user);

  const notifyError = (messageError) => toast.error(`${messageError}`);

  const navigate = useNavigate();

  useEffect(() => {
    if (errorStatus) {
      notifyError(messageError);
      dispatch(changeErrorStatus(false));
    }
  }, [errorStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      switch (userStore.Role.role) {
        case "ADMINISTRADOR":
          return navigate("/dashboard");
          break;
        case "CLIENTE":
          return navigate("/dashboard/client");
          break;

        default:
          break;
      }
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

  return (
    <>
      <Container className="LogContainer">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Link
              to="/session-frontend"
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
              <Row>
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
              </Row>
              <br />
              <Row>
                <hr />
                <Button variant="primary" type="submit">
                  Iniciar sesión
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

export default Login;
