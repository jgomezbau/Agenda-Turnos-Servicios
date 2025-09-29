import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectBox from 'devextreme-react/select-box';
import { Button } from 'devextreme-react/button';
import { getTipoSucursal, getSucursal, getUnidad, getServicio, getTurnos, getSpTipoEstadoTurno, actionDesde, actionHasta } from '../../actions/jardinDelPilar';

export const FiltroCalendario = () => {
    const tipoSucursal = useSelector((state) => state.TIPOSUCURSAL);
    const sucursal = useSelector((state) => state.SUCURSAL);
    const unidad = useSelector((state) => state.UNIDAD);
    const servicio = useSelector((state) => state.SERVICIO);
    const [idUnidad, setIdUnidad] = useState();
    const [idServicio, setIdServicio] = useState();
    const [idSucursal, setIdSucursal] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular las fechas "desde" y "hasta" usando obtenerFechaAjustada
    const fechaDesde = obtenerFechaAjustada(fechaActual, 0); // Deja la actual
    const fechaHasta = obtenerFechaAjustada(fechaActual, 1); // Suma 1 mes

    const desde = fechaDesde.toLocaleString('sv-SE');
    const hasta = fechaHasta.toLocaleString('sv-SE');

    // Mover las llamadas de dispatch a useEffect
    useEffect(() => {
        dispatch(actionDesde(desde));
        dispatch(actionHasta(hasta));
    }, [dispatch, desde, hasta]);

    const onChangeTipoSucursal = (e) => {
        dispatch(getSucursal(e.value));
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

    const consultarTurnos = (e) => {
        sessionStorage.setItem('desde', desde);
        sessionStorage.setItem('hasta', hasta);
        sessionStorage.setItem('idUnidad', idUnidad);
        sessionStorage.setItem('idServicio', idServicio);
        dispatch(getTurnos({ idUnidad, idServicio, desde, hasta })).then(response => {
            if (response) {
                navigate(`/calendario/${idServicio}/${idUnidad}/${idSucursal}`);
            }
        });
    };

    useEffect(() => {
        dispatch(getTipoSucursal());
        dispatch(getSpTipoEstadoTurno());
    }, [dispatch]);

    return (
        <div >
            &nbsp;
            {/* Estilo en negrita usando inline styles */}
            <h3 style={{ fontWeight: 'bold' }}>Seleccione Sucursal y Unidad</h3>
            &nbsp;
            <h5>Tipo Sucursal</h5>
            <SelectBox
                dataSource={tipoSucursal}
                displayExpr="descripcion"
                valueExpr="id_tipo_sucursal"
                onValueChanged={onChangeTipoSucursal}
            />
            &nbsp;
            <h5>Sucursal</h5>
            <SelectBox
                dataSource={sucursal}
                displayExpr="descripcion"
                valueExpr="id_sucursal"
                onValueChanged={onChangeSucursal}
            />
            &nbsp;
            <h5>Unidad</h5>
            <SelectBox
                dataSource={unidad}
                displayExpr="descripcion"
                valueExpr="id_unidad_negocio"
                onValueChanged={onChangeUnidad}
            />
            &nbsp;
            <h5>Servicio</h5>
            <SelectBox
                dataSource={servicio}
                displayExpr="descripcion"
                valueExpr="id_servicio"
                onValueChanged={onChangeServicio}
            />
            <div className='py-6'>
                <Button
                    text="Consultar"
                    type="default"
                    stylingMode="outlined"
                    onClick={consultarTurnos}
                />
            </div>

            {/* Footer agregado */}
        </div>
    );
};
