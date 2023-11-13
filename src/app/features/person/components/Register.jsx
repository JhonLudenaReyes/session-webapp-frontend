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

const valueDefault = {
  name: "",
  lastName: "",
  identificationCard: "",
  email: "",
  cellPhone: "",
  address: "",
  password: "",
};

const valueIdentify = {
  dni: true,
  ruc: false,
};

const Register = () => {
  const notify = () =>
    toast.success("¡Sus datos han registrados satisfactoriamente!");

  const dispatch = useDispatch();
  const [person, setPerson] = useState(valueDefault);
  const [identify, setIdentify] = useState(valueIdentify);

  const verification = useSelector((state) => state.person.verification);
  const personStore = useSelector((state) => state.person.person);

  useEffect(() => {
    if (personStore.personId > 0) {
      dispatch(
        createUser({
          personId: personStore.personId,
          roleId: 2,
          user: person.identificationCard,
          password: person.password,
        })
      );
      dispatch(changePersonState({}));
      clearForm();
    }
  }, [dispatch, personStore]);

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
    console.log(person);
    dispatch(
      createPerson({
        name: person.name,
        lastName: person.lastName,
        identificationCard: person.identificationCard,
        email: person.email,
        cellPhone: person.cellPhone,
        address: person.address,
        password: person.password,
      })
    );
  };

  const clearForm = () => {
    setPerson(valueDefault);
  };

  const selectIdentify = (e) => {
    console.log(e.isTrusted);
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

                  <Form.Group>
                    <Form.Label>Identificación</Form.Label>

                    {["radio"].map((index, type) => (
                      <div key={index} className="mb-3">
                        <Form.Check
                          inline
                          label="Cédula"
                          //name="groupIdentify"
                          valueDefault={identify.dni}
                          type={type}
                          id="dni"
                          onChange={selectIdentify}
                        />
                        <Form.Check
                          inline
                          label="R.U.C."
                          //name="groupIdentify"
                          valueDefault={identify.ruc}
                          type={type}
                          id="ruc"
                          onChange={selectIdentify}
                        />
                      </div>
                    ))}

                    <Form.Control
                      onChange={onChange}
                      value={person.identificationCard}
                      id="identificationCard"
                      type="text"
                      placeholder="Ejm 09xx xxx xxx"
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
                  <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={person.address}
                      id="address"
                      type="text"
                      placeholder="Ejm Gye-Sauces Av.7 Mz.4"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={person.password}
                      id="password"
                      type="password"
                      placeholder="Ejm xxxx xx xx"
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
