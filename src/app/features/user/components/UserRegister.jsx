import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveUser,
  changeState,
  addUser,
  editUser,
  getUsersList,
} from "../userSlice";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import toast, { Toaster } from "react-hot-toast";

import "./styles/User.css";
import { useNavigate } from "react-router-dom";

const valueDefault = {
  userId: 0,
  user: "",
  password: "",
  state: "",
};

const UserRegister = () => {
  const [user, setUser] = useState(valueDefault);
  const userEdit = useSelector((state) => state.user.user);

  const verification = useSelector((state) => state.user.verification);

  const notify = () => toast.success("Successfully toasted!");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userEdit.userId) {
      setUser(userEdit);
    }
  }, []);

  useEffect(() => {
    if (verification === true) {
      toast.success("Successfully toasted!");
      dispatch(changeState(false));
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

    const editData = {
      userId: user.userId,
      user: user.user,
      password: user.password,
    };

    if (user.userId) {
      dispatch(editUser(editData));
    } else {
      dispatch(saveUser(saveData));
    }

    clearForm();
  };

  const clearForm = () => {
    setUser(valueDefault);
  };

  const usersList = () => {
    dispatch(addUser({}));
    navigate("/");
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
            <br />
            <h5>
              <BsFillArrowLeftCircleFill type="button" onClick={usersList} />{" "}
              Volver listado
            </h5>
            <br />
            <br />
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
