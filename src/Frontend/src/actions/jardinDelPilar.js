import axiosInstance from "./axiosInstanceJdp"

//-----Login-----
export function loginJdp(payload) {
    let usuario = payload.replace(/\//g, "");
    return async function (dispatch) {
        try {
            if (usuario) {
                const response = await axiosInstance.post(`loginJdp`, { usuario })
                //axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.acess_token}`
                localStorage.setItem('token', response.data.acess_token);
                localStorage.setItem('currentUser', response.data.usuario);
                localStorage.setItem('User', response.data.usuario);
                localStorage.setItem('Supervisor', response.data.supervisor);
                localStorage.setItem('userID', response.data.id);
                localStorage.setItem('Asistente', response.data.usuario);
                // window.location.reload();
                return 0;

            } else {
                return 1;
            }

        } catch (error) {
            console.log(error)
        }

    }
}
//----- Consultar Tipo de sucursal ------
export function getTipoSucursal() {
    return async function (dispatch) {
        let usuario = localStorage.getItem('User')
        try {
            const response = await axiosInstance.post(`tiposucursal`, { usuario });
            return dispatch({
                type: "TIPOSUCURSAL",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Consultar sucursal ------
export function getSucursal(idTipoSucursal) {
    return async function (dispatch) {
        let usuario = localStorage.getItem('User')
        try {
            const response = await axiosInstance.post(`sucursal`, { idTipoSucursal, usuario });
            return dispatch({
                type: "SUCURSAL",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Consultar Unidad ------
export function getUnidad(idSucursal) {
    return async function (dispatch) {
        let usuario = localStorage.getItem('User')
        try {
            const response = await axiosInstance.post(`unidad`, { idSucursal, usuario });
            return dispatch({
                type: "UNIDAD",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Consultar Servicio ------
export function getServicio(idTipoSucursal) {
    return async function (dispatch) {
        let usuario = localStorage.getItem('User')
        try {
            const response = await axiosInstance.post(`servicio`, { idTipoSucursal, usuario });
            return dispatch({
                type: "SERVICIO",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Consultar Turnos ------
export function getTurnos(payload) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`turnos`, payload);
            return dispatch({
                type: "TURNOS",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
} 

//----- Consultar Clientes ------
export function getSpClienteCRM() {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.get(`SpClienteCRM`);
            return dispatch({
                type: "CLIENTECRM",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//----- Consultar Clientes FILTRADO ------
export function getSpClienteCRMFILTRADO(filtro) {
    // console.log("filtro",filtro)
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`SpClienteCRMFILTRADO`, { filtro });
            return dispatch({
                type: "CLIENTECRMFILTRADO",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


//----- Consultar tipo de estado turno ------
export function getSpTipoEstadoTurno(estado) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`SpTipoEstadoTurno`, { estado });
            return dispatch({
                type: "TIPOESTADOTURNO",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Consultar tipo de estado turno ------
export function getSpTipoEstadoTurnoHabilitado(estado, usuario, idServicio, idUnidad) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`SpTipoEstadoTurnoHabilitado`, { estado, usuario, idServicio, idUnidad });
            return dispatch({
                type: "TIPOESTADOTURNOHABILITADO",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}



//----- Consultar presupuesto ------
export function getSpPresupuestos(idCliente) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`SpPresupuestos`, { idCliente });
            return dispatch({
                type: "PRESUPUESTO",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Consultar versión ------
export function getSpVersion(idPresupuesto, idCliente) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`SpVersion`, { idPresupuesto, idCliente });
            return dispatch({
                type: "VERSION",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Validar turno ------
export function spValidarTurnos(data) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`spValidarTurnos`, data);
            //console.log("response validar turno", response)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Grabar turno ------
export function spGrabarTurnos(data) {
    //console.log("grabar",data)
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`SPGrabarTurno`, data);
            //console.log("response grabar turno", response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}

//----- desde ------
export function actionDesde(desde) {
    return async function (dispatch) {
        try {
            //console.log("desde", desde)
            // Almacena el valor en el sessionStorage
            sessionStorage.setItem('desde', desde);
            return dispatch({
                type: "DESDE",
                payload: desde
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- hasta ------
export function actionHasta(hasta) {
    return async function (dispatch) {
        try {
            //("hasta", hasta)
            // Almacena el valor en el sessionStorage
            sessionStorage.setItem('hasta', hasta);
            return dispatch({
                type: "HASTA",
                payload: hasta
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- currentDate ------
export function actionCurrentDate(currentDate) {
    return async function (dispatch) {
        try {
            // Almacena el valor en el sessionStorage
            //console.log("Lo que le llega a actionCurrentDate", currentDate) 
            sessionStorage.setItem('currentDate', currentDate);
            return dispatch({
                type: "CURRENTDATE",
                payload: currentDate
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// ----- grabar Adicionales ------
export function grabarAdicionales(json) {
    return async function (dispatch) {
        try {
            // const response = await axiosInstance.post(`grabarAdicionales`, {json});
            return dispatch({
                type: "adicionalesTurno",
                payload: json
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Adicionales ------
export function Adicionales(turno, unidad, servicio) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`Adicionales`, { turno, unidad, servicio });
            return dispatch({
                type: "ADICIONALES",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- armar grilla Adicionales ------
export function armarGrillaAdicionales() {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.get(`armarAdicionales`);
            return dispatch({
                type: "COLUMNAS",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//----- Sectores solicitados ------
export function spSectoresHabilitados(sector) {
    return async function (dispatch) {
        let usuario = localStorage.getItem('User')
        try {
            const response = await axiosInstance.post(`spSectorHabilitado`,{usuario,sector});
            return dispatch({
                type: "SECTORHABILITADO",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
// ----- Bloquear Sala -----
export function bloquearSala({ id_Turno,idServicio, idUnidad, fechaDesde, fechaHasta, observaciones, estadoGrilla }) {
    //console.log("bloquearSala - desde adentro de jardindelpilar.js)"  , { id_Turno, idServicio, idUnidad, fechaDesde, fechaHasta, observaciones, estadoGrilla });
    return async function (dispatch) {
        let usuario = localStorage.getItem('User');
        try {
            const response = await axiosInstance.post(`bloquearSala`, {
                id_turno: id_Turno,
                id_servicio: idServicio,
                id_unidad: idUnidad,
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                observaciones,
                estado_grilla: estadoGrilla,
                usuario
            });
            return  response
        } catch (error) {
            console.log(error);
            throw error; // Re-lanzar el error para manejarlo en el componente
        }
    };
}
// ----- Obtener Bloqueos de Sala ------
export function getBloqueos(usuario) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`bloqueos`, { usuario });
            //console.log("response.data", response.data)
            return dispatch({
                type: "BLOQUEOS",
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
}
// ----- Desactivar Bloqueo de Sala ------
export function desactivarBloqueo({ id, habilitado }) {
    return async function (dispatch) {
        try {
            // Enviamos ambos parámetros en la solicitud POST
            const response = await axiosInstance.post('desactivarBloqueo', { id, habilitado });
            //console.log("response.data", response.data);
            return dispatch({
                type: "DESACTIVAR_BLOQUEO",
                payload: response.data
            });
        } catch (error) {
            console.error('Error al desactivar el bloqueo:', error);
            throw error;
        }
    };
}
//----- Consultar Autorizador ------
export function getAutorizador(id_unidad_negocio, usuario) {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.post('getAutorizador', { id_unidad_negocio, usuario });
            return dispatch({
                type: "AUTORIZADOR",
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}
// ----- Consultar Turnos Completo (Nueva Función) -----
export function getTurnosComplete({ desde, hasta }) {
    return async function (dispatch) {
        try {
            // Llama al endpoint del backend con los parámetros desde y hasta
            const response = await axiosInstance.post('grillaTurnosComplete', { desde, hasta });
            // Despacha la acción con el payload obtenido de la respuesta
            return dispatch({
                type: "TURNOS_COMPLETE",
                payload: response.data
            });
        } catch (error) {
            console.error("Error al obtener los turnos completos:", error);
            throw error; // Re-lanzar el error para manejarlo en el componente, si es necesario
        }
    };
}