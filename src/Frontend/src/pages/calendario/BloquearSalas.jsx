  import React, { useEffect, useState , useRef } from 'react';
  import { useDispatch, useSelector } from "react-redux";
  import SelectBox from 'devextreme-react/select-box';
  import DateBox from 'devextreme-react/date-box';
  import Swal from 'sweetalert2'; // Importamos SweetAlert2
  import moment from 'moment'; // Importamos moment para formatear fechas
  import Tooltip from '@mui/material/Tooltip'; // Importamos Tooltip de @mui/material
  import Button from '@mui/material/Button'; // Importamos Button de Material UI
  import EditIcon from '@mui/icons-material/Edit';
  import BlockIcon from '@mui/icons-material/Block';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import { getTipoSucursal, getSucursal, getUnidad, getServicio, bloquearSala, getBloqueos, desactivarBloqueo } from '../../actions/jardinDelPilar.js';

  export const BloquearSalaForm = () => {
    const now = moment().format('YYYY-MM-DDTHH:mm');
    const dispatch = useDispatch();
    const tipoSucursal = useSelector((state) => state.TIPOSUCURSAL);
    const sucursal = useSelector((state) => state.SUCURSAL);
    const unidad = useSelector((state) => state.UNIDAD);
    const servicio = useSelector((state) => state.SERVICIO);
    const grillaBloqueos = useSelector((state) => state.BLOQUEOS) || [];

    const [id_Turno, setId_Turno] = useState("");
    const [idTipoSucursal, setIdTipoSucursal] = useState("");
    const [idSucursal, setIdSucursal] = useState("");
    const [idUnidad, setIdUnidad] = useState("");
    const [idServicio, setIdServicio] = useState("");
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [Status, setStatus] = useState("");
    const [estadoGrilla] = useState(1001); // Valor por defecto 1001
    const [mensaje] = useState("");

    // Referencia para el SelectBox de Tipo Sucursal
    const tipoSucursalRef = useRef(null);    

    // Agrego la opcion TODOS a los select:
    const servicioConOpcionTodos = [{ id_servicio: '0', descripcion: 'Todos los Servicios' }, ...servicio]; // Agregamos el valor "Todos los Servicios" al inicio

    // Obtenemos el usuario desde localStorage
    const usuario = localStorage.getItem("User");

    


    useEffect(() => {
      //console.log("BloquearSalaForm: useEffect");
      const now = new Date();
      //console.log('servicio: ', servicio);
      
      // Ajustar la fecha a la zona horaria de Argentina (UTC-3)
      const offset = -3; // Argentina está en UTC-3
      const localFechaDesde = new Date(now.getTime() + offset * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '); // Formato 'YYYY-MM-DD HH:mm:ss'
    
      setFechaDesde(localFechaDesde);
      setFechaHasta(localFechaDesde);
    }, []);

    useEffect(() => {
      dispatch(getTipoSucursal());
    }, [dispatch]);

    useEffect(() => {
      if (idTipoSucursal && Number.isInteger(Number(idTipoSucursal))) {
        //console.log("Obteniendo sucursales para idTipoSucursal:", idTipoSucursal);
        dispatch(getSucursal(idTipoSucursal));
      }
    }, [idTipoSucursal, dispatch]);

    const onChangeTipoSucursal = (e) => {
      setIdTipoSucursal(e.value);
    };

    const onChangeSucursal = (e) => {
      setIdSucursal(e.value);
      dispatch(getUnidad(e.value));
    };

    const onChangeUnidad = (e) => {
      setIdUnidad(e.value);
      dispatch(getServicio(e.value));
    };

    const onChangeServicio = (e) => {
      setIdServicio(e.value);
    };

    const handleSubmit = async () => {
      try {
        // Llama al dispatch de Redux y espera la resolución
        //console.log("Bloquear sala (variables):", { id_Turno,idServicio, idUnidad, fechaDesde, fechaHasta, observaciones, estadoGrilla, usuario, Status });
        const response = await dispatch(
          bloquearSala({
            id_Turno,
            idServicio,
            idUnidad,
            fechaDesde,
            fechaHasta,
            observaciones,
            estadoGrilla,
            usuario,
            Status
          })
        );
        //console.log("Respuesta del backend:", response);
        //console.log("Respuesta del backend:", response.status);
        //console.log("Respuesta del backend:", response.message);

        // Muestra el mensaje popup con SweetAlert2
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.message || "Sala bloqueada exitosamente.",
          }).then(() => {
            // Recargar la grilla de bloqueos después del éxito
            if (usuario) {
              dispatch(getBloqueos(usuario)).then(() => {
                // Fuerza una actualización del estado local para que la grilla se vuelva a renderizar
                //setIdSucursal(""); // Cambiar algún estado para forzar el re-render
              });
            }
            setId_Turno('');
            setIdTipoSucursal();
            dispatch(getSucursal()); // Para cargar las sucursales correspondientes
            setIdSucursal();
            setIdUnidad('');
            setIdServicio('');
            setFechaDesde(now);
            setFechaHasta(now);
            setObservaciones('');      
     
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: response.message || "Algo salió mal, pero no es grave.",
          });
        }
      } catch (error) {
        console.error("Error de ejecución:", error);

        // Muestra el mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Error al intentar bloquear la sala.',
        });
      }
    };
    const resetFormulario = () => {
      setId_Turno('');
      setIdTipoSucursal();
      dispatch(getSucursal()); // Para cargar las sucursales correspondientes
      setIdSucursal();
      setIdUnidad('');
      setIdServicio('');
      setFechaDesde(now);
      setFechaHasta(now);
      setObservaciones('');      
    };
    
    const handleToggleHabilitado = async (id, habilitado) => {
      try {
        // Llama al dispatch de Redux y envía el ID y el valor habilitado
        //console.log("Desactivando/activando bloqueo:", { id, habilitado });
        const response = await dispatch(desactivarBloqueo({ id, habilitado }));
        //console.log("Recibo en habilitado", habilitado);
        //console.log("Respuesta del backend (desactivar/activar):", response);

        if (response.payload.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.payload.message || (habilitado === 0 ? "Bloqueo desactivado exitosamente." : "Bloqueo activado exitosamente."),
          }).then(() => {
            // Recargar la grilla de bloqueos después de desactivar/activar
            if (usuario) {
              dispatch(getBloqueos(usuario));
            }
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: response.payload.message || "No se pudo realizar la acción.",
          });
        }
      } catch (error) {
        console.error("Error de ejecución (desactivar/activar):", error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Error al intentar realizar la acción.',
        });
      }
    };

    const handleEdit = (bloqueo) => {
      // Cargar los datos del bloqueo seleccionado en el formulario
      //console.log("Bloqueo a editar:", bloqueo);
      
      if (parseInt(bloqueo.habilitado) === 0) {
        setId_Turno('');
        setIdTipoSucursal();
        dispatch(getSucursal()); // Para cargar las sucursales correspondientes
        setIdSucursal();
        setIdUnidad('');
        setIdServicio('');
        setFechaDesde(now);
        setFechaHasta(now);
        setObservaciones('');      
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Solo puede editar turnos habilitados',
        })
      } else {
        setId_Turno(bloqueo.id);
        setIdTipoSucursal(bloqueo.id_tipo_sucursal);
        //console.log("Seteando idTipoSucursal:", bloqueo.id_tipo_sucursal);
        dispatch(getSucursal(bloqueo.id_tipo_sucursal)); // Para cargar las sucursales correspondientes
        setIdSucursal(bloqueo.id_sucursal);
        setIdUnidad(bloqueo.id_unidad);
        setIdServicio(bloqueo.id_servicio);
        setFechaDesde(moment(bloqueo.fecha_hora_desde).format('YYYY-MM-DDTHH:mm'));
        setFechaHasta(moment(bloqueo.fecha_hora_hasta).format('YYYY-MM-DDTHH:mm'));
        setObservaciones(bloqueo.observaciones);
      // Enfocar el SelectBox de Tipo Sucursal
      if (tipoSucursalRef.current) {
        tipoSucursalRef.current.instance.focus();
      }        
      }    
    };

    useEffect(() => {
      if (usuario) {
        dispatch(getBloqueos(usuario)).then(() => {
          //console.log("Datos de bloqueos obtenidos:", grillaBloqueos);
        });
      }
    }, [usuario, dispatch]);

    useEffect(() => {
      //console.log("Grilla de Bloqueos en render:", grillaBloqueos);
    }, [grillaBloqueos]);
    
    console.log("grillaBloqueos", grillaBloqueos);
    return (
      <div>
        {/* Estilo en negrita usando inline styles */}
        <h3 style={{ fontWeight: 'bold' }}>Bloqueo de Salas</h3>
        &nbsp;
        <div className='flex justify-around'>
          <div className='flex flex-col px-2 w-full'>
            &nbsp;
            <h5>Tipo Sucursal</h5>
            <SelectBox
              ref={tipoSucursalRef} // Asignamos la referencia aquí
              dataSource={tipoSucursal}
              displayExpr="descripcion"
              valueExpr="id_tipo_sucursal"
              value={idTipoSucursal}
              onValueChanged={onChangeTipoSucursal}
            />
            &nbsp;
            <h5>Sucursal</h5>
            <SelectBox
              dataSource={sucursal}
              displayExpr="descripcion"
              valueExpr="id_sucursal"
              value={idSucursal}
              onValueChanged={onChangeSucursal}
            />
            &nbsp;
            <h5>Unidad</h5>
            <SelectBox
              dataSource={unidad}
              displayExpr="descripcion"
              valueExpr="id_unidad_negocio"
              value={idUnidad}
              onValueChanged={onChangeUnidad}
            />
            &nbsp;
            <h5>Servicio</h5>
            <SelectBox
              dataSource={servicioConOpcionTodos}
              displayExpr="descripcion"
              valueExpr="id_servicio"
              value={idServicio}
              onValueChanged={onChangeServicio}
            />
            &nbsp;            
            <div className='py-6'>
            &nbsp;
              <Button 
                variant="outlined" 
                onClick={resetFormulario}
              >
                NUEVO
              </Button>
              &nbsp;&nbsp; {/* Esto añadirá espacio extra entre los botones */}
              <Button
                variant="outlined"
                onClick={handleSubmit}
              >
                Bloquear
              </Button>
            </div>
          </div>
          <div className='flex flex-col px-2 w-full'>
            &nbsp;
            <div>
              <h5>Fecha desde:</h5>
              <DateBox
                value={fechaDesde}
                type="datetime"
                pickerType='rollers'
                onValueChanged={(e) => setFechaDesde(e.value)}
                displayFormat="dd/MM/yyyy HH:mm"
              />
            </div>
            &nbsp;
            <div>
              <h5>Fecha hasta:</h5>
              <DateBox
                value={fechaHasta}
                type="datetime"
                pickerType='rollers'
                onValueChanged={(e) => setFechaHasta(e.value)}
                displayFormat="dd/MM/yyyy HH:mm"
              />
            </div>
            &nbsp;
            <div>
              <h5>Detalle del motivo del bloqueo:</h5>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                style={{
                  width: '100%',
                  height: '100px',
                  border: '1px solid #ccc', // Agregamos un borde gris claro
                  padding: '10px', // Agregamos padding para que el texto no esté pegado al borde
                  borderRadius: '4px' // Opcional, para bordes redondeados
                }}
              />
            </div>
            {mensaje && <p>{mensaje}</p>}
          </div>
        </div>
        {/* Grilla de Bloqueos */}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Listado de Bloqueos Activos</h4>
          {grillaBloqueos.length === 0 ? (
            <p>No se encontraron bloqueos.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tipo de Sucursal</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre Sucursal</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Unidad Sucursal</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Bloqueado para</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha Desde</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha Hasta</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Motivo del bloqueo</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Usuario Creador</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {grillaBloqueos.map((bloqueo, index) => (
                  <tr key={`${bloqueo.id}-${index}`}>
                    <td
                      style={{
                        border: '1px solid #ccc',
                        padding: '8px',
                        color:
                          bloqueo["Status"] === "Deshabilitado"
                            ? 'red'
                            : bloqueo["Status"] === "En Curso"
                            ? 'green'
                            : bloqueo["Status"] === "Activo"
                            ? 'blue'
                            : 'inherit', // Color por defecto para otros valores
                      }}
                    >
                      {bloqueo["Status"]}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{bloqueo["Tipo de Sucursal"]}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{bloqueo["Nombre Sucursal"]}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{bloqueo["Unidad Sucursal"]}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{bloqueo["Bloqueado para:"]}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {moment(bloqueo.fecha_hora_desde).format('DD/MM/YY HH:mm')}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {moment(bloqueo.fecha_hora_hasta).format('DD/MM/YY HH:mm')}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{bloqueo.observaciones}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{bloqueo["usuario creador"]}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                      {/* Los botones que queremos habilitar/deshabilitar */}
                      <Tooltip title="Modificar el bloqueo. La fecha de comienzo solo se puede modificar si el bloqueo no ha comenzado aún.">
                        <Button
                          variant="text"
                          onClick={() => handleEdit(bloqueo)}
                          disabled={parseInt(bloqueo.Rol) === 1} // Asegúrate de que bloqueo.rol esté definido correctamente
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>
                      {parseInt(bloqueo.habilitado) === 1 ? (
                        <Tooltip title="Desactivar el bloqueo. Solo si el bloqueo no ha finalizado aún.">
                          <Button
                            variant="text"
                            onClick={() => handleToggleHabilitado(bloqueo.id, 0)}
                            disabled={parseInt(bloqueo.Rol) === 1}
                          >
                            <BlockIcon />
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activar el bloqueo. Solo si el bloqueo no ha finalizado aún.">
                          <Button
                            variant="text"
                            onClick={() => handleToggleHabilitado(bloqueo.id, 1)}
                            disabled={parseInt(bloqueo.Rol) === 1}
                          >
                            <CheckCircleIcon />
                          </Button>
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    );
  };
