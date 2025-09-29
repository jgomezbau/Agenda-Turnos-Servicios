// Archivo: src/components/generateLicense.js
import CryptoJS from 'crypto-js'; 

// Clave secreta para cifrar la licencia
const key = 'h6B3hBvNd1Ff2FZLM+ssX0gC4L+8XJ9R5tT0rL6tIsg'; // Reemplazá esto con tu clave secreta

// Definición de la función generateLicense
function generateLicense() {
  // Datos de la licencia
  const licenseData = {
    expires: '2025-07-31', // Fecha de expiración en formato YYYY-MM-DD
    user: 'Juan Bau'  // Opcional, podés agregar más información como identificación del usuario
  };

  // Convertir los datos de la licencia en un string tipo URLSearchParams
  const licenseString = new URLSearchParams(licenseData).toString();

  // Cifrar los datos de la licencia usando AES
  const encryptedLicense = CryptoJS.AES.encrypt(licenseString, key).toString();

  return encryptedLicense;
}

// Exportación por defecto
export default generateLicense;
