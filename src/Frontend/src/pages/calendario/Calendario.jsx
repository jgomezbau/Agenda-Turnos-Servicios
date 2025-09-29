import React, { useEffect, useState, useCallback } from 'react';
import { Scheduler, Resource, AppointmentDragging } from 'devextreme-react/scheduler';
import { Button } from 'devextreme-react/button';
import { useDispatch, useSelector } from "react-redux";
import { getTurnos, actionDesde, actionHasta, actionCurrentDate, spGrabarTurnos, spValidarTurnos } from '../../actions/jardinDelPilar.js';
import { useNavigate, useParams } from 'react-router-dom';
import AppointmentTooltip from './Tooltip.jsx';
import Appointment from './Appointment.js';
import notify from 'devextreme/ui/notify';
import Paper from "@mui/material/Paper";
import Swal from 'sweetalert2';

import { 
  selectDesde,
  selectHasta,
  selectTurnos,
  selectSucursal,
  selectTipoEstadoTurno,
  selectUnidad,
  selectServicio,
  selectAdicionalesTurno
} from './selectors.js'; // Ajusta la ruta según tu estructura

const views = ['day', {
  type: 'week',
  name: 'Semana',
  intervalCount: 2,
  firstDayOfWeek: 0,
  maxAppointmentsPerCell: 4
}, 'month'];

function getInfoById(array, id, campo) {
  return array.find(item => item[campo] === id);
}

export const Calendario = () => {
  const [currentView] = useState('week');
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  //const currentDate = useSelector(selectCurrentDate);
  const currentDate = new Date();
  const desdeGlobal = useSelector(selectDesde);
  const hastaGlobal = useSelector(selectHasta);
  const turnos = useSelector(selectTurnos);
  const sucursal = useSelector(selectSucursal);
  const tipoEstadoTurno = useSelector(selectTipoEstadoTurno);
  const unidad = useSelector(selectUnidad);
  const servicio = useSelector(selectServicio);
  const adicionales = useSelector(selectAdicionalesTurno);

  let unidadSel = getInfoById(unidad, params.idUnidad, "id_unidad_negocio") || {};
  let servicioSel = getInfoById(servicio, params.idServicio, "id_servicio") || {};
  let sucursalSel = getInfoById(sucursal, params.idSucursal, "id_sucursal") || {};

  // Sumar y restar meses con ajuste de día al último válido en caso de ser necesario
  const obtenerFechaAjustada = (fecha, meses) => {
    const fechaAjustada = new Date(fecha); // Crear una copia
    fechaAjustada.setMonth(fechaAjustada.getMonth() + meses); // Sumar o restar meses

    // Si el día ajustado supera el último día del mes, se ajusta automáticamente
    if (fechaAjustada.getDate() !== fecha.getDate()) {
      fechaAjustada.setDate(0); // Ajusta al último día del mes
    }
    return fechaAjustada;
  };

  const onContentReady = (e) => {
    const TMPcurrentDate = new Date(); // Hora actual
    // Intentar desplazar la vista a la hora actual solo si la vista es "week" o "day"
    if (e.component.option('currentView') === 'week' || e.component.option('currentView') === 'day') {
      try {
        e.component.scrollTo(TMPcurrentDate);
      } catch (error) {
        console.error("Error al intentar hacer scroll a la fecha:", error);
      }
    }
  };

  const onOptionChanged = (e) => {
    if (e.name === 'currentDate' || e.name === 'currentView') {
      const TMPcurrentDate = new Date(); // Hora actual

      // Desplazar a la hora actual solo si la vista es "week" o "day"
      if (e.value === 'week' || e.value === 'day') {
        try {
          e.component.scrollTo(TMPcurrentDate);
        } catch (error) {
          console.error("Error al intentar hacer scroll a la fecha en onOptionChanged:", error);
        }
      }

      // Actualizar la vista cuando cambia la fecha o la vista actual
      if (e.name === 'currentDate') {
        const año = e.value.getFullYear();
        const mes = e.value.getUTCMonth();
        const dia = e.value.getDate();

        // Obtener la hora actual
        const fechaActual = new Date();
        const hora = fechaActual.getHours();
        const minuto = fechaActual.getMinutes();

        // Calcular las fechas "desde" y "hasta" usando obtenerFechaAjustada
        const fechaDesde = obtenerFechaAjustada(new Date(año, mes, dia, hora, minuto), -1);
        const fechaHasta = obtenerFechaAjustada(new Date(año, mes, dia, hora, minuto), 1);

        const desde = fechaDesde.toLocaleString('sv-SE');
        const hasta = fechaHasta.toLocaleString('sv-SE');

        dispatch(actionCurrentDate(new Date(año, mes, dia, hora, minuto)));
        dispatch(actionDesde(desde));
        dispatch(actionHasta(hasta));

        const idUnidad = params.idUnidad;
        const idServicio = params.idServicio;

        dispatch(getTurnos({ idUnidad, idServicio, desde, hasta }));
      }
    }
  };

  const onDragStart = (e) => {
    if (["1001", "1002"].includes(e.itemData.estado)) {
      notify(e.itemData.descripcion_estado, 'warning', 3000);
      e.cancel = true;
    }
  };

  const onAppointmentFormOpening = (e) => {
    if (["1001", "1002"].includes(e.appointmentData.estado)) {
      notify(e.appointmentData.descripcion_estado, 'warning', 3000);
      e.cancel = true;
    } else {
      dispatch({ type: "TURNODATA", payload: e.appointmentData });
      const idTurno = e.appointmentData.id_turnos;
      navigate(`/creareditar/${idTurno}/${params.idServicio}/${params.idUnidad}/${params.idSucursal}`);
      e.cancel = true;
    }
  };

  const actualizarTurnos = (data, idUnidad, idServicio, desde, hasta) => {
    dispatch(spValidarTurnos(data))
      .then(response => {
        if (response.data[0].respuesta === "") {
          return dispatch(spGrabarTurnos(data));
        } else {
          throw new Error(response.data[0].respuesta);
        }
      })
      .then(response => {
        if (response.data[0].respuesta === "") {
          return dispatch(getTurnos({ idUnidad, idServicio, desde, hasta }));
        } else {
          throw new Error(response.data[0].respuesta);
        }
      })
      .catch(error => {
        const mensajeDeErrores = error.message.replace(/(\r\n|\n|\r)/g, '<br>');        
        Swal.fire({
          title: 'Advertencia',
          html: `<div style="font-size: 14px;">${mensajeDeErrores}</div>`,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          allowEscapeKey: false
        });

        dispatch(getTurnos({ idUnidad, idServicio, desde, hasta }));
      });
  };

  const handleAppointmentUpdating = (e) => {
    if (e.newData.fecha_hora_desde !== e.oldData.fecha_hora_desde) {
      const data = {
        turno: e.newData.id_turnos,
        desde: e.newData.fecha_hora_desde,
        hasta: e.newData.fecha_hora_hasta,
        unidad: e.newData.id_unidad_negocio,
        servicio: e.newData.id_servicio,
        cliente: e.newData.id_cliente,
        presupuesto: e.newData.id_presupuesto,
        version: e.newData.id_version,
        estado: e.newData.estado,
        observaciones: e.newData.observaciones,
        usuario: localStorage.getItem('User'),
        fallecido: e.newData.id_fallecido,
        ultima_actualizacion: e.newData.ultima_actualizacion,
        sectorSolicitante: e.newData.sectorSolicitante,
        adicionales: adicionales,
        id_un_servicio: e.newData.id_un_servicio
      };
      const idUnidad = params.idUnidad;
      const idServicio = params.idServicio;
      actualizarTurnos(data, idUnidad, idServicio, desdeGlobal, hastaGlobal);
    }
  };

  const consultarTurnos = useCallback(() => {
    const desde = sessionStorage.getItem('desde');
    const hasta = sessionStorage.getItem('hasta');
    const idUnidad = sessionStorage.getItem('idUnidad');
    const idServicio = sessionStorage.getItem('idServicio');
    dispatch(getTurnos({ idUnidad, idServicio, desde, hasta }))
      .catch(error => {
        const mensajeDeErrores = error.message.replace(/(\r\n|\n|\r)/g, '<br>');        
        Swal.fire({
          title: 'Advertencia',
          html: `<div style="font-size: 14px;">${mensajeDeErrores}</div>`,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      });
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(consultarTurnos, 120000);
    return () => clearInterval(intervalId);
  }, [consultarTurnos]);

  return (
    <React.Fragment>
      <div>
        <div className='flex justify-around items-center my-3'>
          <div className='flex text-lg'>
            <p className='font-sans'>Sucursal: {sucursalSel.descripcion} - {unidadSel.descripcion}</p>
          </div>
          <p className='text-lg'>Servicio: {servicioSel.descripcion}</p>
          <Button
            text="Actualizar"
            type="default"
            stylingMode="outlined"
            onClick={consultarTurnos}
          />
        </div>
        <Paper>
          <Scheduler
            timeZone="America/Buenos_Aires"
            dataSource={turnos}
            views={views}
            defaultCurrentView={currentView}
            defaultCurrentDate={currentDate}
            height={'81vh'}
            textExpr="servicio"
            startDateExpr="fecha_hora_desde"
            endDateExpr="fecha_hora_hasta"
            showCurrentTimeIndicator={true}
            allDayPanelMode='hidden'
            editing={true}
            onContentReady={onContentReady}
            onAppointmentFormOpening={onAppointmentFormOpening}
            appointmentTooltipComponent={AppointmentTooltip}
            onOptionChanged={onOptionChanged}
            appointmentComponent={Appointment}
            onAppointmentUpdating={handleAppointmentUpdating}
          >
            <Resource
              fieldExpr="estado"
              allowMultiple={false}
              dataSource={tipoEstadoTurno}
              useColorAsDefault={true}
            />
            <AppointmentDragging
              onDragStart={onDragStart}
              autoScroll={true}
            />
          </Scheduler>
        </Paper>
      </div>
    </React.Fragment>
  );
};