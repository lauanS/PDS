import axios from "axios";
import { getToken } from "./auth";
import { statusCharToString, statusStringToChar } from "../utils/statusConverter";
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL
});

const apiDev = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER
});

/* Adicionando o token de autenticação no cabeçalho de cada request */
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token && token !== "TOKEN") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/******** Denúncias ********/
export async function getReports(){
  const response = await api.get('/denuncias');
  const reports = response.data;
  
  
  const data = reports.map((report, key) => {
    return {
      "id": report.id,
      "description": report.descricao,
      "address": report.endereco,
      "animal": report.especie,
      "breeds": report.raca,
      "status": statusCharToString(report.status),
      "isAnonymous": report.indAnonimo,
      "lat": report.latitude,
      "lng": report.longitude,
    }
  });
  return data;
}

export async function postReport(report){
  const obj = {
    "descricao": report.description,
    "endereco": report.address,
    "especie": report.animal,
    "raca": report.breeds,
    "status": statusStringToChar(report.status),
    "indAnonimo": report.isAnonymous,
    "longitude": report.lng,
    "latitude": report.lat
  }
  return api.post('/denuncias', obj);
}

export async function putReport(report, id){
  const obj = {
    "id": id,
    "descricao": report.description,
    "endereco": report.address,
    "especie": report.animal,
    "raca": report.breeds,
    "status": statusStringToChar(report.status),
    "indAnonimo": report.isAnonymous,
    "longitude": report.lng,
    "latitude": report.lat
  }
  return api.put('/denuncias', obj);
}

export async function deleteReport(id){
  return api.delete('/denuncias/' + id);  
}

/******** Comentários ********/


/******** Login ********/
export async function postSignIn(signIn){
  const obj = {
    email: signIn.email,
    password: signIn.password
  }
  const response = await api.post('/authenticate', obj);
  const data = response.data;
  return { token: data.jwt };
}

export async function postSignUp(signUp){
  const obj = {
    nome: signUp.name,
    email: signUp.email,
    senha: signUp.password
  }
  const response = await api.post('/cadastro', obj);
  return response;
}

export async function postGoogleSignIn(signIn) {
  const obj = {
    email: signIn.email,
    nome: signIn.name
  }
  const response = await api.post('/authenticate/google', obj);
  const data = response.data;
  return { token: data.jwt };
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

/******** Comentários ********/
export async function getCommentsDev(){
  return (await apiDev.get('/comments')).data;
}

export async function getReportCommentsDev(reportId){
  const response = await apiDev.get('/comments', { params: { reportId} });
  return response.data;
}

/******** Funções fake de login e cadastro ********/
export async function postSignInDev(signIn){
  console.log("Login: ", signIn);
  console.log("...");
  await delay(2000);
  console.log("ok");
  return { data: { token: "TOKEN"} };
}

export async function postSignUpDev(signUp){
  console.log("Novo cadastro: ", signUp);
  console.log("...");
  await delay(2000);
  console.log("ok");
  return;
}

export async function postGoogleSignInDev(signIn) {
  console.log("Login via Google: ", signIn);
  await delay(2000);
  return { data: { token: signIn.token }};
}

/******** útil ********/
const delay = ms => new Promise(res => setTimeout(res, ms));