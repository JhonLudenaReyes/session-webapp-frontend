import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { loginUser, changeErrorStatus } from "../authSlice";

//REACT HOOK FORM VALIDATOR
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//REACT-HOT-TOAST
import toast, { Toaster } from "react-hot-toast";

import "./styles/Login.css";

// YUP SCHEMA DEFAULT
const schema = yup
  .object({
    user: yup
      .string()
      .required("El usuario es un campo obligatorio")
      .min(10, "El usuario debe tener al menos 10 caracteres")
      .max(13, "El usuario debe tener como máximo 13 caracteres"),
    password: yup
      .string()
      .required("El password es un campo obligatorio")
      .min(7, "El password debe tener al menos 7 caracteres")
      .max(13, "El password debe tener como máximo 13 caracteres."),
  })
  .required();

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errorStatus = useSelector((state) => state.auth.errorStatus);
  const messageError = useSelector((state) => state.auth.messageError);
  const userStore = useSelector((state) => state.auth.user);

  const notifyError = (messageError) => toast.error(`${messageError}`);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const onSubmit = (login) => {
    console.log(login);
    dispatch(loginUser(login));
  };

  return (
    <>
      <Container className="LogContainer">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Link
              to="/session-webapp"
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
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    id="user"
                    type="text"
                    placeholder="Ejm andhern"
                    {...register("user")}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {errors.user?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Ejm *** *** **"
                    {...register("password")}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {errors.password?.message}
                  </Form.Text>
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
