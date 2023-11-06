import { useState, useEffect } from "react";

import axios from "axios";

import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineUserDelete, AiOutlineUserAdd } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";

import { useNavigate } from "react-router-dom";

import { addUser } from "../userSlice";

import toast, { Toaster } from "react-hot-toast";

import "./styles/UsersList.css";
import { useDispatch } from "react-redux";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifyDelete = () => toast.success("Datos eliminados correctamente!");

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    const usersList = await axios.get(`http://127.0.0.1:4449/users`);
    if (usersList.status == 200) {
      setUsers(usersList.data);
    }
  };

  const deleteUser = (user) => {
    const result = confirm(`¿Esta seguro que desea eliminar este usuario?`);
    result ? deleteUserById(user) : alert(`No se han eliminado sus datos`);
  };

  const deleteUserById = async (user) => {
    const result = await axios.delete(
      `http://127.0.0.1:4449/users/${user.userId}`
    );
    if (result.status == 200) {
      alert(
        `El usuario: ${user.user} con identificador: ${user.userId} a sido eliminado correctamente`
      );
      notifyDelete();
      getUsersList();
    }
  };

  const userRegister = () => {
    navigate("/user-register");
  };

  const editUser = (user) => {
    dispatch(addUser(user));
    userRegister();
  };

  return (
    <>
      <Container className="UsersListContainer">
        <Row>
          <Col></Col>
          <Col>
            <h2>
              Listado de <b>usuarios</b>
            </h2>
            <h5>
              Agregar usuario
              <AiOutlineUserAdd type="button" onClick={userRegister} />{" "}
            </h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{user.user}</td>
                      <td>{user.password}</td>
                      <td>
                        <Container>
                          <Row>
                            <Col>
                              <LiaUserEditSolid
                                type="button"
                                onClick={() => editUser(user)}
                              />
                            </Col>
                            <Col>
                              <AiOutlineUserDelete
                                type="button"
                                onClick={() => deleteUser(user)}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Toaster />
    </>
  );
};

export default UsersList;
