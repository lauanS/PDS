export const TOKEN_KEY = "@salvacao-token";
export const TOKENTIME_KEY = "@salvacao-tokentime"; 

export const isAuth = () => {
  return sessionStorage.getItem(TOKEN_KEY) !== null;
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
}

export const isAdministrator = () => {
  return isAuth();
}

export const login = token => {
  console.log("Login realizado com sucesso");
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(TOKENTIME_KEY, Date.now());
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};