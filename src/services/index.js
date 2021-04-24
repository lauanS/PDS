// Denúncias
export async function getReports(){
  return [
          {
            "lat":-23.55413,
            "lng":-46.64044,
            "date": "XX",
            "adress": "Avenide Ipanemas, 123, São Paulo, SP",
            "animal": "Papagaio",
            "breeds": "",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ligula accumsan leo efficitur finibus. Donec quis nisl condimentum, mattis purus id, dictum urna.",
            "status": "closed"
          }, {
            "lat":-23.56313,
            "lng":-46.6544,
            "date": "XX",
            "adress": "Rua Carvalho Cavalcanti, 33, São Paulo, SP",
            "animal": "Gato",
            "breeds": "",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ligula accumsan leo efficitur finibus. Donec quis nisl condimentum, mattis purus id, dictum urna.",
            "status": "opened"
          }, {
            "lat":-23.54613,
            "lng":-46.63944,
            "date": "XX",
            "adress": "Rua Sete e Meio de Abril, 123, São Paulo, SP",
            "animal": "Cão",
            "breeds": "pinscher",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ligula accumsan leo efficitur finibus. Donec quis nisl condimentum, mattis purus id, dictum urna.",
            "status": "opened"
          }]
}

export async function postReport(report){
  console.log("Nova denúncia: ", report);
  return;
}

export async function putReport(id){
  return;
}

export async function deleteReport(id){
  return;
}