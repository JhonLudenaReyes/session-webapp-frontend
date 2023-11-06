import { useState, useEffect } from "react";

import axios from "axios";

import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineUserDelete } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";

import "./styles/UsersList.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    const usersList = await axios.get(`http://127.0.0.1:4449/users`);
    if (usersList.status == 200) {
      setUsers(usersList.data);
    }
  };

  const deleteUser = () => {
    confirm(`¿Esta seguro que desea eliminar este usuario?`);
  };

  return (
    <>
      <Container className="UsersListContainer">
        <Row>
          <Col></Col>
          <Col>
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
                              <AiOutlineUserDelete type="button" />
                            </Col>
                            <Col>
                              <LiaUserEditSolid
                                type="button"
                                onClick={deleteUser}
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
    </>
  );
};

export default UsersList;
