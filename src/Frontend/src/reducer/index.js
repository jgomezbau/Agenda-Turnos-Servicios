const initialState = {
    currentUser: [],
    menus: [],
    empresas: [],
    temas: [],
    columnas: [],
    PIVOT: [],
    data: [],
    adicionalesTurno: [],
    adicionalesOK: true,
    desde: localStorage.getItem("Desde") ? localStorage.getItem("Desde") : "",
    hasta: localStorage.getItem("Hasta") ? localStorage.getItem("Hasta") : "",
    //currentDate: new Date(),
    currentDate : new Date().toLocaleString('sv-SE'),    
    TIPOSUCURSAL: [],
    SUCURSAL: [],
    UNIDAD: [],
    SERVICIO: [],
    TURNOS: [],
    CLIENTECRM: [],
    TIPOESTADOTURNO: [],
    TIPOESTADOTURNOHABILITADO: [],
    PRESUPUESTO: [],
    VERSION: [],
    turnoData: [],
    CLIENTECRMFILTRADO: [],
    ADICIONALES: [],
    SECTORHABILITADO: [],
    // Nuevas propiedades para manejar la licencia
    licencia: null,  // Aquí se almacena el valor de la licencia obtenida
    estadoLicencia: null,  // Aquí se almacena si la licencia ha expirado o está válida
    // Nuevas propiedades para manejar Desactivacion de Bloqueos
    bloqueos: [],
    // Nueva propiedad para manejar autorizadores
    AUTORIZADOR: []
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "POST_USER":
            return {
                ...state
            };
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: action.payload
            };
        case "LOGOUT":
            return {
                ...state
            };
        
        case "MENU":
            return {
                ...state,
                menus: action.payload
            };

        case "TEMAS":
            return {
                ...state,
                temas: action.payload
            };

        case "SET_LICENSE":
            return {
                ...state,
                licencia: action.payload,  // Actualiza el valor de la licencia
            };

        case "SET_LICENSE_EXPIRADA":
            return {
                ...state,
                estadoLicencia: action.payload,  // Actualiza el estado de la licencia como "LicenciaExpirada"
            };

        case "COLUMNAS":
            return {
                ...state,
                columnas: action.payload
            };
        case "DESDE":
            return {
                ...state,
                desde: action.payload
            };
        case "HASTA":
            return {
                ...state,
                hasta: action.payload
            };
        case "CURRENTDATE":
            return {
                ...state,
                currentDate: action.payload
            };
        case "TIPOSUCURSAL":
            return {
                ...state,
                TIPOSUCURSAL: action.payload
            };
        case "SUCURSAL":
            return {
                ...state,
                SUCURSAL: action.payload
            };
        case "UNIDAD":
            return {
                ...state,
                UNIDAD: action.payload
            };
        case "SERVICIO":
            return {
                ...state,
                SERVICIO: action.payload
            };
        case "TURNOS":
            return {
                ...state,
                TURNOS: action.payload
            };
        case "CLIENTECRM":
            return {
                ...state,
                CLIENTECRM: action.payload
            };
        case "CLIENTECRMFILTRADO":
            return {
                ...state,
                CLIENTECRMFILTRADO: action.payload
            };
        case "TIPOESTADOTURNO":
            return {
                ...state,
                TIPOESTADOTURNO: action.payload
            };
        case "TIPOESTADOTURNOHABILITADO":
            return {
                ...state,
                TIPOESTADOTURNOHABILITADO: action.payload
            };
        case "PRESUPUESTO":
            return {
                ...state,
                PRESUPUESTO: action.payload
            };
        case "VERSION":
            return {
                ...state,
                VERSION: action.payload
            };
        case "TURNODATA":
            return {
                ...state,
                turnoData: action.payload
            };
        case "ADICIONALES":
            return {
                ...state,
                ADICIONALES: action.payload
            };
        case "adicionalesTurno":
            return {
                ...state,
                adicionalesTurno: action.payload
            };
        case "adicionalesOK":
            return {
                ...state,
                adicionalesOK: action.payload
            };
        case "SECTORHABILITADO":
            return {
                ...state,
                SECTORHABILITADO: action.payload
            };
        case "BLOQUEOS":
            return {
                ...state,
                BLOQUEOS: action.payload
            };
        case "DESACTIVAR_BLOQUEO":
            // Aquí podrías actualizar la lista de bloqueos si fuera necesario
            return {
                ...state,
                bloqueos: state.bloqueos.map(bloqueo => 
                    bloqueo.id === action.payload.id ? { ...bloqueo, habilitado: action.payload.habilitado } : bloqueo
                )
            };
        case "AUTORIZADOR":
            return {
                ...state,
                AUTORIZADOR: action.payload
            };
        case "TURNOS_COMPLETE": // Nuevo caso para manejar los turnos completos
        return {
            ...state,
            TURNOS_COMPLETE: action.payload
        };            
        default:
            return state;
    }
}
export default rootReducer;
