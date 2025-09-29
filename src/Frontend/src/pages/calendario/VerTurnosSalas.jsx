import React, { useEffect, useState, useCallback } from 'react';
import { Scheduler, Resource } from 'devextreme-react/scheduler';
import { useDispatch, useSelector } from "react-redux";
import { getTurnosComplete, actionDesde, actionHasta, actionCurrentDate } from '../../actions/jardinDelPilar.js';
import { useParams } from 'react-router-dom';
import { FullAppTooltip } from './Tooltip.jsx';
import Appointment from './Appointment.js';
import Paper from "@mui/material/Paper";
import Swal from 'sweetalert2';

import { 
  selectTurnosComplete,
} from './selectors.js'; // Ajusta la ruta según tu estructura


const views = ['day', {
  type: 'week',
  name: 'Semana',
  intervalCount: 2,
  firstDayOfWeek: 0,
  maxAppointmentsPerCell: 4
}, 'month'];

export const CalendarioFull = () => {
  const [currentView] = useState('month');
  const params = useParams();
  const dispatch = useDispatch();
  const currentDate = new Date();
  const turnos = useSelector(selectTurnosComplete) || []; // Asegurarse de que turnos no sea undefined

  // Obtener la fecha actual
  const fechaActual = new Date();

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

  const fechaDesde = obtenerFechaAjustada(fechaActual, -1); // Resta 1 meses
  const fechaHasta = obtenerFechaAjustada(fechaActual, 1); // Suma 1 meses

  // Formateo de fecha
  const formatearFecha = (fecha) =>
    `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}`;

  const [desde] = useState(formatearFecha(fechaDesde));
  const [hasta] = useState(formatearFecha(fechaHasta));

  // Mover las llamadas de dispatch a useEffect
  useEffect(() => {
    dispatch(actionDesde(desde));
    dispatch(actionHasta(hasta));
  }, [dispatch, desde, hasta]);


  const onContentReady = (e) => {
    const TMPcurrentDate = new Date();
    if (e.component.option('currentView') === 'week' || e.component.option('currentView') === 'day'|| e.component.option('currentView') === 'month') {
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
        dispatch(getTurnosComplete({ desde, hasta }));
      }
    }
  };

  const consultarTurnos = useCallback(() => {
    const desde = sessionStorage.getItem('desde');
    const hasta = sessionStorage.getItem('hasta');

    dispatch(getTurnosComplete({ desde, hasta }))
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
    // Llamada inicial para cargar los turnos al montar el componente
    consultarTurnos();
  
    // Luego, configuramos el intervalo para que siga consultando cada 30 segundos
    const intervalId = setInterval(consultarTurnos, 120000);
  
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [consultarTurnos]);
  

  // Función para agrupar los turnos por sucursal
  const groupTurnosBySucursal = (turnos) => {
    if (!turnos || turnos.length === 0) return {}; // Manejar caso de array vacío o undefined
    return turnos.reduce((acc, turno) => {
      const sucursal = turno.NombreSucursal;
      if (!acc[sucursal]) {
        acc[sucursal] = [];
      }
      acc[sucursal].push(turno);
      return acc;
    }, {});
  };

  // Agrupamos los turnos por sucursal
  const turnosAgrupados = groupTurnosBySucursal(turnos);

  return (
    <React.Fragment>
      <div>
        {Object.keys(turnosAgrupados).map((sucursal, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'center' }}>{sucursal}</h2>
            <Paper>
              <Scheduler
                timeZone="America/Buenos_Aires"
                dataSource={turnosAgrupados[sucursal]}
                views={views}
                defaultCurrentView={currentView}
                defaultCurrentDate={currentDate}
                height={'81vh'}
                textExpr="servicio"
                startDateExpr="fecha_hora_desde"
                endDateExpr="fecha_hora_hasta"
                showCurrentTimeIndicator={true}
                allDayPanelMode='hidden'
                editing={false}
                onContentReady={onContentReady}
                appointmentTooltipComponent={FullAppTooltip}
                appointmentComponent={Appointment}
                onOptionChanged={onOptionChanged}
                onAppointmentDblClick={(e) => e.cancel = true}
                >
                <Resource
                  fieldExpr="estado"
                  allowMultiple={false}
                  dataSource={turnosAgrupados[sucursal].map(t => ({
                    id: t.estado,
                    color: t.color,
                    text: t.descripcion_estado
                  }))}
                  useColorAsDefault={true}
                />
              </Scheduler>
            </Paper>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CalendarioFull;
