import React from 'react';
import Moment from 'moment';
import { Button } from 'devextreme-react/button';
import { FaCircle, FaCalendar } from 'react-icons/fa';

export default class AppointmentTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turnoInfo: props.data.appointmentData,
        };
    }
    handleCloseClick = (e) => {

    };
    render() {
        const { turnoInfo } = this.state;
        return (
            <div>
                <div className='px-4 py-1 flex items-end justify-end gap-2'>
                    <Button
                        icon='edit'
                        //onClick={() => console.log('Hola')}
                    />
                    <Button
                        icon='close' 
                        onClick={this.handleCloseClick}
                    />
                </div>

                <div>
                    <div className="flex columns-2 space-x-4 items-start justify-start font-sans text-xl">
                        <div >
                            <FaCircle style={{ color: turnoInfo.color }} />
                        </div>
                        <div>
                            <strong>{turnoInfo.servicio}</strong> {' - '}Turno: {turnoInfo.id_turnos}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex columns-2 space-x-4 items-start justify-start font-sans text-base">
                        <div>
                            <FaCalendar style={{ verticalAlign: 'middle' }} />
                        </div>
                        <div>
                            {Moment(turnoInfo.fecha_hora_desde).format('D MMM yyyy HH:mm')} {' - '}{Moment(turnoInfo.fecha_hora_hasta).format('D MMM yyyy HH:mm')}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-x-8 items-start justify-start font-sans text-base">
                    <div>
                        {''}
                    </div>
                    <div>
                        Cliente: {turnoInfo.NombreCliente}{' - ('}{turnoInfo.id_cliente}{')'}
                    </div>
                    <div>
                        Solicita: {turnoInfo.descripcion_sector}
                    </div>
                    <div>
                        Presupuesto: {turnoInfo.id_presupuesto}
                    </div>
                    <div>
                        Version: {turnoInfo.id_version}
                    </div>
                    <div>
                        Estado: {turnoInfo.descripcion_estado}
                    </div>
                    <div>
                        Fallecido: {turnoInfo.fallecido}
                    </div>
                    <div>
                        Observaciones: {turnoInfo.observaciones}
                    </div>
                </div>
            </div>
        );
    }
}

export class FullAppTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turnoInfo: props.data.appointmentData,
        };
    }
    handleCloseClick = (e) => {
    };
    render() {
        const { turnoInfo } = this.state;
        return (
            <div>
                <div className='px-4 py-1 flex items-end justify-end gap-2'>
                    <Button
                        icon='edit'
                        //onClick={() => console.log('Hola')}
                    />
                    <Button
                        icon='close' 
                        onClick={this.handleCloseClick}
                    />
                </div>

                <div>
                    <div className="flex columns-2 space-x-4 items-start justify-start font-sans text-xl">
                        <div >
                            <FaCircle style={{ color: turnoInfo.color }} />
                        </div>
                        <div>
                            <strong>{turnoInfo.servicio}</strong> {' - '}Turno: {turnoInfo.id_turnos}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex columns-2 space-x-4 items-start justify-start font-sans text-base">
                        <div>
                            <FaCalendar style={{ verticalAlign: 'middle' }} />
                        </div>
                        <div>
                            {Moment(turnoInfo.fecha_hora_desde).format('D MMM yyyy HH:mm')} {' - '}{Moment(turnoInfo.fecha_hora_hasta).format('D MMM yyyy HH:mm')}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-x-8 items-start justify-start font-sans text-base">
                    <div>
                        {''}
                    </div>
                    <div>
                        Sala: {turnoInfo.unidad_negocio}
                    </div>
                    <div>
                        Cliente: {turnoInfo.NombreCliente}{' - ('}{turnoInfo.id_cliente}{')'}
                    </div>
                    <div>
                        Solicita: {turnoInfo.descripcion_sector}
                    </div>
                    <div>
                        Presupuesto: {turnoInfo.id_presupuesto}
                    </div>
                    <div>
                        Version: {turnoInfo.id_version}
                    </div>
                    <div>
                        Estado: {turnoInfo.descripcion_estado}
                    </div>
                    <div>
                        Fallecido: {turnoInfo.fallecido}
                    </div>
                    <div>
                        Observaciones: {turnoInfo.observaciones}
                    </div>
                </div>
            </div>
        );
    }
}
