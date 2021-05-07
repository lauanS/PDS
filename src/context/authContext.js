import React, { createContext, useState, useEffect } from 'react';

import { isAuth, isAdministrator, logout, login } from '../services/auth';

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(isAuth());

  let adminFlag = false;
  const setAdminFlag = (value) => { adminFlag = value };
  
  const isAuthenticated  = () => {
    if(isAuth() !== authenticated){
      console.debug("isAuth: ", isAuth());
      console.debug("authenticated: ", authenticated);
      console.debug("Erro inesperado -> Autenticação em dois estados diferentes");
    }
    return authenticated;
  };

  const isAdmin = () => {    
    if(isAdministrator() !== authenticated){
      console.debug("isAuth: ", isAuth());
      console.debug("authenticated: ", authenticated);
      console.debug("Erro inesperado -> Admin em dois estados diferentes");
    }
    return adminFlag;
  }

  const handleLogout = () => {
    logout();
    setAdminFlag(false);
    setAuthenticated(false);
  };

  const handleLogin = (token) => {
    login(token);
    setAuthenticated(true);
  };

  /* Verifica se o usuário já está logado */
  useEffect(() => {
    setAuthenticated(isAuth());
  }, []);


  return (
    <Context.Provider value={{ isAuthenticated, isAdmin, handleLogin,  handleLogout, setAdminFlag}}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };