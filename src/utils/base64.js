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
