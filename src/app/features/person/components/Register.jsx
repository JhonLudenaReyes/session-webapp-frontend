// REACT
import React, { useEffect, useState } from "react";
//REACT-ROUTER-DOM
import { Link } from "react-router-dom";
//REACT-REDUX
import { useDispatch, useSelector } from "react-redux";

//SLICES
import {
  createPerson,
  createUser,
  changeState,
  changePersonState,
} from "../personSlice";

//REACT-BOOTSTRAP
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//REACT-ICONS
import { AiOutlineArrowLeft } from "react-icons/ai";
//REACT-HOT-TOAST
import toast, { Toaster } from "react-hot-toast";
//CSS
import "./styles/Register.css";
import { RadioGroup, Radio } from "react-radio-group";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//REGULAR EXPRESSIONS
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    name: yup
      .string()
      .required("El nombre es un campo obligatorio")
      .matches(
        "[a-zA-Z ]{2,254}",
        "Solo puede ingresar letras mayúsculas, minúsculas y espacios"
      )
      .min(10, "El usuario debe tener al menos 10 caracteres")
      .max(30, "El usuario debe tener como máximo 30 caracteres"),
    lastName: yup
      .string()
      .required("El apellido es un campo obligatorio")
      .matches(
        "[a-zA-Z ]{2,254}",
        "Solo puede ingresar letras mayúsculas, minúsculas y espacios"
      )
      .min(10, "El usuario debe tener al menos 10 caracteres")
      .max(30, "El usuario debe tener como máximo 30 caracteres"),
    identificationCard: yup.string(),
    ruc: yup.string(),
    email: yup
      .string()
      .required("El email es un campo obligatorio")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        "El correo electrónico debe ser un correo electrónico válido"
      ),
    cellPhone: yup
      .string()
      .required("El celular es un campo obligatorio")
      .matches(phoneRegExp, "El número celular que ha ingresado no es válido")
      .min(10, "Debe ingresar 10 caracteres")
      .max(10, "Debe ingresar 10 caracteres"),
    address: yup
      .string()
      .required("La dirección es un campo obligatorio")
      .min(15, "El usuario debe tener al menos 15 caracteres")
      .max(100, "El usuario debe tener como máximo 100 caracteres"),
    password: yup
      .string()
      .required("La contraseña es un campo obligatorio")
      .min(8, "El usuario debe tener al menos 8 caracteres")
      .max(16, "El usuario debe tener como máximo 16 caracteres")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter de caso especial."
      ),
  })
  .required();

const Register = () => {
  const notify = () =>
    toast.success("¡Sus datos han registrados satisfactoriamente!");

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("dni");

  const verification = useSelector((state) => state.person.verification);
  const personStore = useSelector((state) => state.person.person);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (personStore.personId > 0) {
      dispatch(
        createUser({
          personId: personStore.personId,
          roleId: 2,
          user: watch("identificationCard")
            ? watch("identificationCard")
            : watch("ruc"),

          password: watch("password"),
        })
      );
      dispatch(changePersonState({}));
      reset();
    }
  }, [dispatch, personStore]);

  useEffect(() => {
    if (verification === true) {
      notify();
      dispatch(changeState(false));
    }
  }, [verification, dispatch]);

  const onSubmit = (data) => {
    //<pre>{JSON.stringify(watch(), null, 2)}</pre>
    dispatch(
      createPerson({
        name: data.name,
        lastName: data.lastName,
        identificationCard: data.identificationCard,
        ruc: data.ruc,
        email: data.email,
        cellPhone: data.cellPhone,
        address: data.address,
        password: data.password,
      })
    );
  };

  const handleChange = (event) => {
    setSelectedValue(event);
    if (event == "dni") {
      watch("ruc", "");
    } else {
      watch("identificationCard", "");
    }
  };

  return (
    <>
      <Container className="AuthRegisContainer">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Link
              to="/session-frontend"
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
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      id="name"
                      type="text"
                      placeholder="Ejm Manuel Andrés "
                      {...register("name")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.name?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      id="lastName"
                      type="text"
                      placeholder="Ejm Hernandez Cortés"
                      {...register("lastName")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.lastName?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Identificación</Form.Label>

                    <RadioGroup
                      name="Identify"
                      selectedValue={selectedValue}
                      onChange={handleChange}
                    >
                      <Radio value="dni" />
                      Cédula <Radio value="ruc" />
                      R.U.C.
                    </RadioGroup>
                    <hr />
                    <Form.Control
                      id="identificationCard"
                      type="text"
                      placeholder="Ejm 09xx xxx xxx"
                      hidden={selectedValue == "dni" ? false : true}
                      {...register("identificationCard")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.identificationCard?.message}
                    </Form.Text>

                    <Form.Control
                      id="ruc"
                      type="text"
                      placeholder="Ejm 24xxx xxxx xxxx"
                      hidden={selectedValue == "ruc" ? false : true}
                      {...register("ruc")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.ruc?.message}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      id="email"
                      type="email"
                      placeholder="Ejm correo@mail.com"
                      {...register("email")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                      id="cellPhone"
                      type="text"
                      placeholder="Ejm 099 999 9999"
                      {...register("cellPhone")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.cellPhone?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      id="address"
                      type="text"
                      placeholder="Ejm Gye-Sauces Av.7 Mz.4"
                      {...register("address")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.address?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Ejm xxxx xx xx"
                      {...register("password")}
                    />
                    <Form.Text style={{ color: "red" }}>
                      {errors.password?.message}
                    </Form.Text>
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
