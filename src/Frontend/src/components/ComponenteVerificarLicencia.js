// Archivo: src/components/ComponenteVerificarLicencia.js

import React from 'react';
import { useSelector } from 'react-redux';

const ComponenteVerificarLicencia = () => {
    // Accede al estado de la licencia
    const estadoLicencia = useSelector((state) => state.licencia.estadoLicencia);

    return (
        <div>
            {estadoLicencia === 'LicenciaExpirada' ? (
                <p>Su Licencia ha expirado, por favor cargue una nueva licencia.</p>
            ) : (
                <p>Licencia válida.</p>
            )}
        </div>
    );
};
