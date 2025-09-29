import React from 'react'
import { useDispatch } from 'react-redux';
import { loginJdp } from '../actions/jardinDelPilar';
//import { useNavigate } from 'react-router-dom';

export const LoginJDP = () => {
    //const navigate = useNavigate();
    const dispatch = useDispatch();
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    //const pathname = window.location.pathname;
    let parametros = window?.location.search;
    let parametro = parametros?.split("?");
    let desencriptar = parametro[1]?.split("/");
    let desencriptado = window.atob(desencriptar[0]);

    // Cargar la URL desde el archivo .env
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
   
    if (valores && urlParams) {
        let usuario = desencriptado.substring(8,desencriptado.length);
        let path = desencriptar[1];
        dispatch(loginJdp(usuario)).then(response => {
            if (response === 0) {

                window.location.href = `${redirectUrl}/#/${path}`;        
            }
        })
    }
    return (
        <div>Usuario No autenticado. Verifique.</div>
    )
}
