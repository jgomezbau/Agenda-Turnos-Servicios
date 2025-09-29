import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import SelectBox from 'devextreme-react/select-box';
import DateBox from 'devextreme-react/date-box';
import Query from 'devextreme/data/query';
import { Button } from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import { Lookup } from 'devextreme-react/lookup';
import { GrillaAdicionales } from './GrillaAdicionales';
import {
    getSpClienteCRMFILTRADO, spGrabarTurnos, spValidarTurnos, getSpTipoEstadoTurno, getSpTipoEstadoTurnoHabilitado,
    getSpPresupuestos, getSpVersion, getTurnos, spSectoresHabilitados, getUnidad, getAutorizador
} from '../../actions/jardinDelPilar';
import moment from 'moment';

import Swal from 'sweetalert2';
import { debounce } from 'lodash';

export const EditarCrearTurno = () => {
    let params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const desdeGlobal = useSelector((state) => state.desde);
    const hastaGlobal = useSelector((state) => state.hasta);
    const clienteFiltrado = useSelector((state) => state.CLIENTECRMFILTRADO);
    const tipoEstadoTurnoHabilitado = useSelector((state) => state.TIPOESTADOTURNOHABILITADO);
    const presupuesto = useSelector((state) => state.PRESUPUESTO);
    const version = useSelector((state) => state.VERSION);
    const turnoData = useSelector((state) => state.turnoData);
    const sectorHabilitado = useSelector((state) => state.SECTORHABILITADO);
    const unidad = useSelector((state) => state.UNIDAD);

    const [idTurno] = useState(params.idTurno);
    
    const [id_un_servicio, setid_un_servicio] = useState(turnoData.id_un_servicio || params.id_un_servicio);
    
    const [servicio] = useState(params.idServicio);
    const [clienteSel, setClienteSel] = useState(turnoData.id_cliente);
    const [presupuestoSel, setPresupuestoSel] = useState(turnoData.id_presupuesto || 'Seleccionar presupuesto...');
    const [ultimaActualizacion] = useState(turnoData.ultima_actualizacion);
    const [versionSel, setVersionSel] = useState(turnoData.id_version || 'Seleccionar versión...');
    const [estadotoSel, setEstadoSel] = useState(turnoData.estado);
    const [observacionesSel, setObservacionesSel] = useState(turnoData.observaciones);
    const [usuarioSel] = useState(localStorage.getItem('User'));
    const [desde, setDesde] = useState(turnoData.fecha_hora_desde ? new Date(turnoData.fecha_hora_desde) : new Date());
    const [hasta, setHasta] = useState(turnoData.fecha_hora_hasta ? new Date(turnoData.fecha_hora_hasta) : new Date());
    const [fallecido, setFallecido] = useState(turnoData.fallecido);
    const [fallecidoID, setFallecidoID] = useState(turnoData.id_fallecido);


    const [resultadoAutorizador, setResultadoAutorizador] = useState(0);
    const [sectorHabilitadoSel, setSectorHabilitadoSel] = useState(turnoData.sectorSolicitante);
    const [placeholderCliente, setPlaceholderCliente] = useState('');
    const [placeholderPresupuesto, setPlaceholderPresupuesto] = useState('Seleccionar presupuesto...');
    const [placeholderVersion, setPlaceholderVersion] = useState('Seleccionar versión...');

    const adicionalesOK = useSelector((state) => state.adicionalesOK);

    let sucursalSel = getInfoById(useSelector((state) => state.SUCURSAL), params.idSucursal, "id_sucursal") || {};
    let servicioSel = getInfoById(useSelector((state) => state.SERVICIO), params.idServicio, "id_servicio") || {};
    let unidadSelIngreso = getInfoById(useSelector((state) => state.UNIDAD), params.idUnidad, "id_unidad_negocio") || {};

    const [unidadSel, setUnidadSel] = useState(turnoData.id_unidad_negocio || unidadSelIngreso.id_unidad_negocio);
    const [unidadSelOLD] = useState(turnoData.id_unidad_negocio || unidadSelIngreso.id_unidad_negocio);
    const data = {
        turno: idTurno,
        desde: moment(desde).format('YYYY-MM-DD HH:mm:ss'),
        hasta: moment(hasta).format('YYYY-MM-DD HH:mm:ss'),
        unidad: unidadSel,
        servicio: servicio,
        cliente: clienteSel,
        presupuesto: presupuestoSel === '' || presupuestoSel === 'Seleccionar presupuesto...' ? -1 : presupuestoSel,
        version: versionSel === '' || versionSel === 'Seleccionar versión...' ? -1 : versionSel,
        estado: estadotoSel,
        observaciones: observacionesSel,
        usuario: usuarioSel,
        fallecido: fallecidoID,
        ultima_actualizacion: ultimaActualizacion,
        sectorSolicitante: sectorHabilitadoSel,
        adicionales: useSelector((state) => state.adicionalesTurno),
        id_un_servicio: id_un_servicio
    };

    function getInfoById(array, id, campo) {
        return Query(array).filter([campo, id]).toArray()[0];
    }

    const onChangeUnidad = (e) => {
        setid_un_servicio(null)
        setUnidadSel(e.value);
    };

    const onChangeDesde = (e) => {
        setDesde(e.value);
    };

    const onChangeHasta = (e) => {
        setHasta(e.value);
    };

    const onInputCliente = debounce((e) => {
        dispatch(getSpClienteCRMFILTRADO(e.event.originalEvent?.target.value));
    }, 300);

    const onValueChangeCliente = (e) => {
        dispatch({ type: 'PRESUPUESTO', payload: [] });
        dispatch({ type: 'VERSION', payload: [] });
        let clienteSelObj = getInfoById(clienteFiltrado, e.value, "id") || {};
        setClienteSel(e.value);
        setPresupuestoSel('Seleccionar presupuesto...');
        setVersionSel('Seleccionar versión...');
        setFallecidoID("");
        setFallecido("");
        setPlaceholderCliente(clienteSelObj?.text);
        setPlaceholderPresupuesto('Seleccionar presupuesto...');
        setPlaceholderVersion('Seleccionar versión...');
        if (e.value) {
            dispatch(getSpPresupuestos(e.value));
        }
    };
    const onChangePresupuesto = (e) => {
        setVersionSel('Seleccionar versión...');
        setFallecidoID("");
        setFallecido("");
        setPresupuestoSel(e.value);
        setPlaceholderVersion('Seleccionar versión...');
        if (e.value && clienteSel) {
            dispatch(getSpVersion(e.value, clienteSel));
        }
    };

    const onChangeVersion = (e) => {
        setVersionSel(e.value);
        const fallecidoInfo = getInfoById(version, e.value, "id") || {};
        setFallecido(fallecidoInfo.fallecido);
        setFallecidoID(fallecidoInfo.id_fallecido);
    };

    const onChangeEstado = (e) => {
        setEstadoSel(e.value);
    };

    const onChangeObservaciones = (e) => {
        setObservacionesSel(e.value);
    };

    const onChangeSectorSolicitante = (e) => {
        setSectorHabilitadoSel(e.value);
    };

    const grabarTurno = () => {
        dispatch(spValidarTurnos(data)).then(response => {
            if (response.data[0].respuesta === "") {
                dispatch(spGrabarTurnos(data)).then(response => {
                    if (response.data[0].respuesta === "") {
                        //setUnidadSel(data.unidad);
                        sessionStorage.setItem('idUnidad', data.unidad);
                        dispatch(getTurnos({ idUnidad: data.unidad, idServicio: servicio, desde: desdeGlobal, hasta: hastaGlobal })).then(() => {
                            navigate(`/calendario/${servicio}/${data.unidad}/${params.idSucursal}`);
                        });
                    } else {
                        setUnidadSel(unidadSelOLD);
                        Swal.fire({
                            title: 'Advertencia',
                            html: response.data[0].respuesta.replace(/(\r\n|\n|\r)/g, '<br>'),
                            icon: 'warning',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                    }
                });
            } else {
                setUnidadSel(unidadSelOLD);
                Swal.fire({
                    title: 'Advertencia',
                    html: response.data[0].respuesta.replace(/(\r\n|\n|\r)/g, '<br>'),
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            }
        });
    };

    // Nueva llamada para obtener autorizador y setear el valor en resultadoAutorizador

    const cancelar = () => {
        navigate(`/calendario/${servicio}/${unidadSelOLD}/${params.idSucursal}`);
        setPlaceholderCliente('');
    };

    useEffect(() => {
        const id_unidad_negocio = params.idUnidad;
        dispatch(getAutorizador(id_unidad_negocio, usuarioSel)).then(response => {
            if (response && response.payload) {
                setResultadoAutorizador(1);
            } else {
                setResultadoAutorizador(0);
            }
        });
    }, [dispatch, params.idUnidad, usuarioSel]);

    useEffect(() => {
        const estado = turnoData.estado !== null && turnoData.estado !== undefined ? turnoData.estado : 1; // Asigna 1 como valor predeterminado
        if (turnoData.id_cliente) {
            dispatch(getSpPresupuestos(turnoData.id_cliente));
            dispatch(getSpClienteCRMFILTRADO(turnoData.id_cliente));
        }
        if (estado) {
            dispatch(getSpTipoEstadoTurnoHabilitado(turnoData.estado, localStorage.getItem('User'), servicio, unidadSel));
            dispatch(getSpTipoEstadoTurno(turnoData.estado));
        }
        if (turnoData.id_presupuesto && turnoData.id_cliente) {
            dispatch(getSpVersion(turnoData.id_presupuesto, turnoData.id_cliente));
        }
        dispatch(spSectoresHabilitados(turnoData.sectorSolicitante));
    }, [turnoData, servicio, unidadSel, dispatch]);

    useEffect(() => {
        if (!unidad.length) {
            dispatch(getUnidad(params.idSucursal));
        }
    }, [dispatch, params.idSucursal, unidad]);

    return (
        <React.Fragment>
            <div>
                <div className='flex justify-around underline underline-offset-8'>
                    <div className='flex text-lg'>
                        <p className='font-sans'>
                            {'Sucursal: ' + sucursalSel.descripcion + ' - ' + unidadSelIngreso.descripcion}&nbsp;&nbsp;&nbsp;
                        </p>
                    </div>
                    <p className='text-lg'>{'Servicio: ' + servicioSel.descripcion}</p>
                </div>
                <div className='flex justify-around'>
                    <div className='flex flex-col px-2 w-full'>
                        &nbsp;
                        <h5>Desde</h5>
                        <DateBox
                            value={desde}
                            type="datetime"
                            pickerType='rollers'
                            onValueChanged={onChangeDesde}
                            displayFormat="dd/MM/yyyy HH:mm"
                        />
                        &nbsp;
                        <h5>Cliente</h5>
                        <Lookup
                            dataSource={clienteFiltrado}
                            valueExpr="id"
                            displayExpr="text"
                            defaultValue={turnoData.id_cliente}
                            placeholder={placeholderCliente || turnoData.razon_social || "Seleccionar..."}
                            searchEnabled={true}
                            onInput={onInputCliente}
                            onFocusIn={onInputCliente}
                            onValueChanged={onValueChangeCliente}
                        />
                        &nbsp;
                        <h5>Presupuesto</h5>
                        <SelectBox
                            dataSource={presupuesto}
                            valueExpr="ID_Presupuesto"
                            displayExpr="text"
                            value={presupuestoSel}
                            placeholder={placeholderPresupuesto}
                            onValueChanged={onChangePresupuesto}
                        />
                        &nbsp;
                        <h5>Versión</h5>
                        <SelectBox
                            dataSource={version}
                            valueExpr="id"
                            displayExpr="text"
                            value={versionSel}
                            placeholder={placeholderVersion}
                            onValueChanged={onChangeVersion}
                        />
                        &nbsp;
                        <h5>Sector Solicitante</h5>
                        <SelectBox
                            dataSource={sectorHabilitado}
                            valueExpr="id"
                            displayExpr="text"
                            value={sectorHabilitadoSel}
                            onValueChanged={onChangeSectorSolicitante}
                        />
                    </div>
                    <div className='flex flex-col px-2 w-full'>
                        &nbsp;
                        <h5>Hasta</h5>
                        <DateBox
                            value={hasta}
                            type="datetime"
                            pickerType='rollers'
                            onValueChanged={onChangeHasta}
                            displayFormat="dd/MM/yyyy HH:mm"
                        />
                        &nbsp;
                        <h5>Estado</h5>
                        <SelectBox
                            dataSource={tipoEstadoTurnoHabilitado}
                            valueExpr="id"
                            displayExpr="text"
                            value={estadotoSel}
                            onValueChanged={onChangeEstado}
                        />
                        &nbsp;
                        <h5>Fallecido</h5>
                        <TextBox
                            readOnly={true}
                            hoverStateEnabled={false}
                            value={fallecido}
                        />
                        &nbsp;
                        <h5>Turno</h5>
                        <TextBox
                            readOnly={true}
                            hoverStateEnabled={false}
                            value={turnoData.id_turnos}
                        />
                        &nbsp;
                        <h5 style={{ color: 'red' }}>Sala Destino</h5>
                        <SelectBox
                            dataSource={unidad}
                            valueExpr="id_unidad_negocio"
                            displayExpr="descripcion"
                            value={unidadSel || unidadSelIngreso.id_unidad_negocio}
                            onValueChanged={onChangeUnidad}
                            disabled={resultadoAutorizador === 0}
                        />
                    </div>
                </div>
                &nbsp;
                <h5>Observaciones</h5>
                <TextArea
                    height={90}
                    defaultValue={turnoData.observaciones}
                    onValueChanged={onChangeObservaciones}
                />
                &nbsp;
                <h5>Adicionales</h5>
                <GrillaAdicionales
                    turno={turnoData.id_turnos}
                    unidad={params.idUnidad}
                    servicio={params.idServicio}
                />
                <div className="flex flex-row py-4">
                    {adicionalesOK && (
                        <div className='px-1'>
                            <Button
                                text="Aceptar"
                                type="success"
                                stylingMode="outlined"
                                onClick={grabarTurno}
                            />
                        </div>
                    )}
                    <div className='px-1'>
                        <Button
                            text="Cancelar"
                            type="danger"
                            stylingMode="outlined"
                            onClick={cancelar}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
