import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, changeState } from "../userSlice";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import toast, { Toaster } from "react-hot-toast";

import "./styles/User.css";

const valueDefault = {
  userId: 0,
  user: "",
  password: "",
  state: "",
};

const UserRegister = () => {
  const [user, setUser] = useState(valueDefault);
  const verification = useSelector((state) => state.user.verification);

  const notify = () => toast.success("Successfully toasted!");

  const dispatch = useDispatch();

  useEffect(() => {
    if (verification === true) {
      console.log(verification);
      toast.success("Successfully toasted!");
      dispatch(changeState);
    }
  }, [verification, dispatch]);

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
    }*/
    clearForm();
  };

  const clearForm = () => {
    setUser(valueDefault);
  };

  return (
    <>
      <Container className="UserContainer" fluid>
        <Row>
          <Col></Col>
          <Col>
            <h1>
              <b>Registro de usuario</b>
            </h1>
            <Form noValidate onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  id="user"
                  type="text"
                  value={user.user}
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
                  value={user.password}
                  placeholder="Password"
                  onChange={onChange}
                />
                <Form.Text className="text-muted">
                  La contraseña acepta un máximo de 8 caracteres.
                </Form.Text>
              </Form.Group>
              <Button onClick={notify} variant="primary" type="submit">
                Guardar los cambios
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Toaster />
    </>
  );
};

export default UserRegister;
