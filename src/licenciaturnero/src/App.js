import React, { useState } from 'react';
import generateLicense from './components/generateLicense'; // Importación sin llaves porque es default

function App() {
  const [license, setLicense] = useState('');

  // Generar la licencia cuando se presiona el botón
  const handleGenerateLicense = () => {
    const newLicense = generateLicense();
    setLicense(newLicense);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generador de Licencias</h1>
        <button onClick={handleGenerateLicense}>Generar Licencia</button>
        {license && (
          <div>
            <h2>Licencia Generada:</h2>
            <p>{license}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
