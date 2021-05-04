import React, { createContext, useState, useEffect } from 'react';

import { isAuth, logout, login } from '../services/auth';

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  const isAuthenticated  = () => {
    if(isAuth() !== authenticated){
      console.debug("Erro inesperado -> Autenticação em dois estados diferentes");
    }
    return authenticated;
  };

  const handleLogout = () => {
    setAuthenticated(false);
    logout();
  };

  const handleLogin = (token) => {
    setAuthenticated(true);
    login(token);
  };

  /* Verifica se o usuário já está logado */
  useEffect(() => {
    setAuthenticated(isAuth());
  }, []);


  return (
    <Context.Provider value={{ isAuthenticated, handleLogin,  handleLogout}}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };