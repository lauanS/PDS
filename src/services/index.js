import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL
});

/* Adicionando o token de autenticação no cabeçalho de cada request */
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/******** Denúncias ********/
export async function getReports(){
  return api.get('/reports');
}

export async function postReport(report){
  return api.post('/reports', report);
}

export async function putReport(id){
  return;
}

export async function deleteReport(id){
  return;
}

/******** Login ********/
export async function postSignIn(signIn){
  console.log("Login: ", signIn);
  console.log("...");
  await delay(2000);
  console.log("ok");
  return { data: { token: "TOKEN"} };
}

export async function postSignUp(signUp){
  console.log("Novo cadastro: ", signUp);
  console.log("...");
  await delay(2000);
  console.log("ok");
  return;
}

export async function postGoogleSignIn(signIn) {
  console.log("Login via Google: ", signIn);
  await delay(2000);
  return { data: { token: signIn.token }};
}

/******** útil ********/
const delay = ms => new Promise(res => setTimeout(res, ms));