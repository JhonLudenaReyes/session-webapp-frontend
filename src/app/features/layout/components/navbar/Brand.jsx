import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../../../../../static/img/logo.png";
import "./styles/Brand.css";

const Brand = () => {
  return (
    <>
      <Link to="/session-webapp" className="Link-brand">
        <Image src={Logo} width="60" height="60" roundedCircle />
        {"  "}
        <b>Session webapp</b>
      </Link>
    </>
  );
};

export default Brand;
