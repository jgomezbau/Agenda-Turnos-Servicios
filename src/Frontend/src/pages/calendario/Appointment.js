import React from 'react';
import Moment from 'moment';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turnoInfo: props.data.appointmentData,
    };
  }

  render() {
    const { turnoInfo } = this.state;

    // Asegúrate de que las fechas estén en un formato correcto - aca viajan en formato ISO Internacional
    //const fechaDesde = new Date(turnoInfo.fecha_hora_desde).toISOString(); // Convertimos la fecha a ISO
    //const fechaHasta = new Date(turnoInfo.fecha_hora_hasta).toISOString(); // Convertimos la fecha a ISO

    // 
    const fechaDesde = new Date(turnoInfo.fecha_hora_desde).toLocaleString('sv-SE'); // Formato ISO local
    const fechaHasta = new Date(turnoInfo.fecha_hora_hasta).toLocaleString('sv-SE'); // Formato ISO local
    //('fechaDesde y fechaHasta',fechaDesde, fechaHasta);
     return (
      <div className="flex flex-col items-start font-sans text-[10px] text-gray-900">
        <div className="flex flex-col items-start font-sans text-xs text-gray-900">
          <strong>{turnoInfo.servicio}</strong>
        </div>
        <div className="flex flex-col items-start font-sans text-[8px] text-gray-900">
          {Moment(fechaDesde).format('DD MM YY HH:mm')} {/* Usamos la fecha en formato ISO */}
        </div>
        <div className="flex flex-col items-start font-sans text-[8px] text-gray-900">
          {Moment(fechaHasta).format('DD MM YY HH:mm')} {/* Usamos la fecha en formato ISO */}
        </div>
        <div>
          Turno: {turnoInfo.id_turnos}
        </div>
        <div>
          Cliente:
        </div>
        <div>
          {turnoInfo.id_cliente}
        </div>
        <div>
          Presup.:
        </div>
        <div>
          {turnoInfo.id_presupuesto}
        </div>
      </div>
    );
  }
}
