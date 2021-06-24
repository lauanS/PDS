import React, { createContext, useState, useEffect } from "react";

import { isAuth, isAdministrator, logout, login } from "../services/auth";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(isAuth());
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [adminFlag, setAdminFlag] = useState(false);

  // let adminFlag = false;
  // const setAdminFlag = (value) => { adminFlag = value };

  const isAuthenticated = () => {
    if (isAuth() !== authenticated) {
      console.debug("isAuth: ", isAuth());
      console.debug("authenticated: ", authenticated);
      console.debug(
        "Erro inesperado -> Autenticação em dois estados diferentes"
      );
    }
    return authenticated;
  };

  const isAdmin = () => {
    if (isAdministrator() !== authenticated) {
      console.debug("isAuth: ", isAuth());
      console.debug("authenticated: ", authenticated);
      console.debug("Erro inesperado -> Admin em dois estados diferentes");
    }
    return isAuthenticated && adminFlag;
  };

  const handleLogout = () => {
    logout();
    setUserName("");
    setUserEmail("");
    setAdminFlag(false);
    setAuthenticated(false);
  };

  const handleLogin = (auth) => {
    login(auth.token);
    setUserName(auth.username);
    setUserEmail(auth.email);
    setAuthenticated(true);
    if (auth.isAdmin) {
      setAdminFlag(true);
    }
    console.log(auth);
  };

  const getUser = () => {
    return userName;
  }

  const getEmail = () => {
    return userEmail;
  }
  /* Verifica se o usuário já está logado */
  useEffect(() => {
    setAuthenticated(isAuth());
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        isAdmin,
        handleLogin,
        handleLogout,
        setAdminFlag,
        getUser,
        getEmail,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
