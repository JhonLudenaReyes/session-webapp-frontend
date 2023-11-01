import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "./app/features/user/userSlice";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import toast, { Toaster } from "react-hot-toast";

import "./App.css";

const notify = () => toast("Here is your toast.");

const valueDefault = {
  userId: 0,
  user: "",
  password: "",
  state: "",
};

const App = () => {
  const [user, setUser] = useState(valueDefault);
  const verification = useSelector((state) => state.user.verification);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(verification);
  }, [verification]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const saveData = {
      user: user.user,
      password: user.password,
    };

    console.log(saveData);

    dispatch(saveUser(saveData));

    /*const editData = {
      idProducto: product.idProducto,
      idCategoria: selectedOption.value,
      producto: producto.producto,
      precio: producto.precio,
      stock: producto.stock,
    };

    if (product.idProducto) {
      dispatch(editProduct(editData));
    } else {
      dispatch(saveProduct(saveData));
    }
    clearForm();*/
  };

  return (
    <>
      <Container className="UserContainer" fluid>
        <Toaster />
        <Row>
          <Col></Col>
          <Col>
            <h1><b>Registro de usuario</b></h1>
            <Form noValidate onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  id="user"
                  type="text"
                  placeholder="Ingrese su usuario"
                  onChange={onChange}
                />
                <Form.Text className="text-muted">
                  Ingrese el usuario que desea guardar.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                />
                <Form.Text className="text-muted">
                  La contraseña acepta un máximo de 8 caracteres.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar los cambios
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
