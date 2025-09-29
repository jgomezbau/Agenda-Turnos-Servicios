import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmpresas, updateToken } from '../../actions';
//import { getLicense } from '../../actions/jardinDelPilar';
import EmpresasInfo from './empresasInfo';
import List from 'devextreme-react/list';


const Empresas = () => {
    const empresas = useSelector((state) => state.empresas);
    const [empresa, setEmpresa] = useState();
    const [db, setdb] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = localStorage.getItem('currentUser');

    const handlechange = (e) => {
        setEmpresa(e.itemData.NombreEmpresa);
        setdb(e.itemData.NombreDB);
    };

    // Lógica para actualizar el token
    useEffect(() => {
        if (empresa && db && user) {
            dispatch(updateToken({ user, empresa, db }))
                .then(response => {
                    if (response === 401) {
                        window.location.reload(false);
                    } else if (response === 200) {
                        navigate("/");
                        window.location.reload();
                    }
                });
        }
    }, [empresa, db, dispatch, navigate, user]);

    // Obtener la lista de empresas
    useEffect(() => {
        if (user) {
            dispatch(getEmpresas({ user }));
        }
    }, [dispatch, user]);

    // Obtener la licencia desde Redux
    //const Licencia = useSelector((state) => state.licencia);

    // Despachar la acción para obtener la licencia cuando el componente se monta

    // useEffect(() => {
    //     if (user) {
    //         dispatch(getLicense());  // Despacha la acción para obtener la licencia
    //     }
    // }, [dispatch, user]);

    // Para depuración, muestra la licencia en la consola
    // useEffect(() => {
    // console.log('Licencia:', Licencia);
    // }, [Licencia]);  // Solo se ejecuta cuando `Licencia` cambia

    return (
        <div>
            <h3>Agenda de gestión de turnos de Jardin del Pilar sa</h3>
            <List
                dataSource={empresas}
                height={400}
                itemRender={EmpresasInfo}
                onItemClick={handlechange}
            />
        </div>
    );
}

export default Empresas;
