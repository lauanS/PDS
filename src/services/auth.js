export const TOKEN_KEY = "@salvacao-token";
export const TOKENTIME_KEY = "@salvacao-tokentime"; 

export const isAuth = () => {
  return sessionStorage.getItem(TOKEN_KEY) !== null;
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
}

export const isAdministrator = () => {
  return sessionStorage.getItem('@salvacao-isAdmin');
}

export const getLoggedUsername = () => {
  return sessionStorage.getItem('@salvacao-username');
}

export const getLoggedEmail = () => {
  return sessionStorage.getItem('@salvacao-email');
}

export const login = token => {
  sessionStorage.setItem(TOKEN_KEY, token.token);
  sessionStorage.setItem(TOKENTIME_KEY, Date.now());
  sessionStorage.setItem('@salvacao-username', token.username);
  sessionStorage.setItem('@salvacao-email', token.email);
  sessionStorage.setItem('@salvacao-isAdmin', token.isAdmin);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};