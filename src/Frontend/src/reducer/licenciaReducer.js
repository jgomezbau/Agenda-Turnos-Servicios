// Archivo: reducers/licenciaReducer.js
const initialState = {
    licencia: null,  // Licencia obtenida de la base de datos
    estadoLicencia: null,  // Estado de la licencia (puede ser 'LicenciaExpirada' o null)
};
const licenciaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LICENSE':
            return {
                ...state,
                licencia: action.payload,  // Actualiza el valor de la licencia
            };
        case 'SET_LICENSE_EXPIRADA':
            return {
                ...state,
                estadoLicencia: action.payload,  // Actualiza el estado de la licencia como "LicenciaExpirada"
            };
        default:
            return state;
    }
};
export default licenciaReducer;
