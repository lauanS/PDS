import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL
});

// Denúncias
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

export async function postSignUp(signUp){
  console.log("Novo cadastro: ", signUp);
  return;
}