import CryptoJS from 'crypto-js';

export function validateLicenseFile(key, encryptedData) {
  //console.log('encryptedData:', encryptedData);
  //console.log  ('key:', key); 
  try {
    // Desencriptar la licencia usando AES de CryptoJS
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error('Error al desencriptar la licencia');
    }

    // Parsear los datos desencriptados y verificar la fecha de expiración
    const licenseInfo = new URLSearchParams(decrypted);
    const expirationDate = new Date(licenseInfo.get('expires'));
    const currentDateLic = new Date();
    //console.log('licenseInfo:', licenseInfo);
    //console.log('currentDateLic - expirationDate:', currentDateLic , expirationDate); 
    //console.log('currentDateLic > expirationDate:', currentDateLic > expirationDate); 

    if (currentDateLic > expirationDate) {
      throw new Error('Licencia expirada');
    }

    return true; // Licencia válida
  } catch (err) {
    console.error('Error de licencia:', err.message);
    return false; // Licencia inválida
  }
}
