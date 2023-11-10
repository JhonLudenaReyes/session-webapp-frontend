import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../../../auth/authSlice";

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser(false));
    navigate("/session-frontend");
  };

  return (
    <>
      <Row>
        <Col md="auto">
          <b style={{ color: "white" }}>
            {user.Person.name + " " + user.Person.lastName}
          </b>
        </Col>
        <Col md="auto">
          <Link
            to="/login"
            className="btn btn-outline-primary"
            onClick={onLogoutClick}
          >
            Cerrar Sesión
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default AuthButton;
