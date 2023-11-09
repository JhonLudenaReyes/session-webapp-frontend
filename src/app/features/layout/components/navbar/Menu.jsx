import React from "react";
import { useSelector } from "react-redux";
import AuthLink from "./AuthLink";
import GuestLink from "./GuestLink";
import "./styles/Menu.css";

const Menu = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const authLinks = <AuthLink />;
  const guestLinks = <GuestLink />;
  return <>{isAuthenticated ? authLinks : guestLinks}</>;
};

export default Menu;
