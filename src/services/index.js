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
  const response = await api.get('/denuncias');
  const report = response.data;
  console.log(response);

  const obj = {
    "description": report.descricao,
    "address": report.endereco,
    "animal": report.especie,
    "breeds": report.raca,
    "status": report.status,
    "isAnonymous": report.indAnonimo,
    "lat": report.longitude,
    "lng": report.latitude,
  }

  return obj;
}

export async function postReport(report){
  const obj = {
    "descricao": report.description,
    "endereco": report.address,
    "especie": report.animal,
    "raca": report.breeds,
    "status": report.status,
    "indAnonimo": report.isAnonymous,
    "longitude": report.lat,
    "latitude": report.lng
  }
  return api.post('/denuncias', obj);
}

export async function putReport(id){
  return;
}

export async function deleteReport(id){
  return;
}

/******** Denúncias JSON SERVER ********/
export async function getReportsDev(){
  return (await api.get('/reports')).data;
}

export async function postReportDev(report){
  return api.post('/reports', report);
}

export async function putReportDev(id){
  return;
}

export async function deleteReportDev(id){
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

/******** útil ********/
const delay = ms => new Promise(res => setTimeout(res, ms));