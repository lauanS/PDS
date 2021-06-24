export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function base64ToFile(base64, fileName) {
  // de: "data:image/png;base64,iVBORw0KG...
  // para:  "data:image/png;base64"
  const baseInfo = base64.split(",")[0];
  // de: "data:image/png;base64"
  // para: "image/png"
  const type = baseInfo.match(/:(.*?);/);

  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], fileName, { type });
}

export function fileType(base64file){
  // de: "data:image/png;base64,iVBORw0KG...
  // para:  "data:image/png;base64"
  return base64file.split(",")[0];
}

export function getFileType(filePreview){
  const baseInfo = filePreview.split(",")[0];

  const isBase64 = baseInfo.match(/data:(.*?);base64/);
  if(isBase64){
    if(baseInfo.indexOf("data:image") !== -1){
      return "img";
    } 
    return "video";
  }
  if(filePreview.match(/(png|jpg)\?generation/)){
    return "img";
  } 
  return "video";
}