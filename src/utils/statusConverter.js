export function statusCharToString(value) {
  if (value === "A") {
    return "opened";
  } else if (value === "P") {
    return "processing";
  } else if (value === "F") {
    return "closed"
  }
}

export function statusTranslate(value) {
  if (value === "opened") {
    return "Aberto";
  } else if (value === "processing") {
    return "Processando";
  } else if (value === "closed") {
    return "Fechado"
  }
}



export function statusStringToChar(value) {
  if (value === "opened") {
    return "A";
  } else if (value === "processing") {
    return "P";
  } else if (value === "closed") {
    return "F"
  }
}
