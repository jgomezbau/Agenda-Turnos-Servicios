import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"; // Asegúrate de importar Navigate
import Empresas from './pages/empresas/Empresas';
import esMessages from "devextreme/localization/messages/es.json";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch } from "react-redux";
import themes from "devextreme/ui/themes";
import { getTemas } from './actions/temas';
import { checkToken } from './actions';
import { Calendario } from './pages/calendario/Calendario';
import { FiltroCalendario } from './pages/calendario/FiltroCalendario';
import { EditarCrearTurno } from './pages/calendario/EditarCrearTurno';
import axios from 'axios';  // Importación de axios
import Swal from 'sweetalert2';
import { validateLicenseFile } from './components/licenceCheck';  // Importá la función de validación
import { BloquearSalaForm } from './pages/calendario/BloquearSalas';
import { CalendarioFull } from './pages/calendario/VerTurnosSalas';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar mensajes en español y configurar localización
    loadMessages(esMessages);
    locale("es"); // Aquí estamos forzando el idioma español.

    // Verificar token de autenticación
    dispatch(checkToken())
      .then(response => {
        if (response === 401) {
          console.log('error del token');
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          window.location.reload();
        }
      });
      const verificarLicencia = async () => {
        try {
          // Obtener el token del localStorage
          const token = localStorage.getItem('token');
      
          if (!token) {
            throw new Error('No se encontró el token de autenticación');
          }
      
          // Configuración del encabezado para la solicitud
          const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Incluimos el token en la solicitud
            },
          };
          
          // Realizamos la solicitud con axios y enviamos el encabezado
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL_API_JDP}getLicense`, config);
          const licenciaEncriptada = response.data?.licencia;
      
          // Usar una llave que sea consistente y segura para desencriptar
          const key = ''; 
          //console.log('Licencia encriptada:', licenciaEncriptada);
      
          const licenciaValida = validateLicenseFile(key, licenciaEncriptada);
          if (!licenciaValida) {
            dispatch({ type: 'SET_LICENSE_EXPIRADA', payload: 'LicenciaExpirada' });
            
            await Swal.fire({
              title: 'Advertencia',
              icon: 'error',
              html: `<div style="font-size: 14px;">Licencia expirada o inválida - El sistema se cerrará.</div>`,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                window.close();
              }
            });
            
          } else {
            dispatch({ type: 'SET_LICENSE', payload: licenciaEncriptada });
          }
        } catch (error) {
          console.error('Error al verificar la licencia:', error);
      
          await Swal.fire({
            title: 'Advertencia',
            icon: 'error',
            html: `<div style="font-size: 14px;">Error al verificar la licencia - El sistema se cerrará.</div>`,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              window.close();
            }
          });
        }
      };
      
    verificarLicencia();

    // Configurar tema
    const savedTheme = localStorage.getItem("dx-theme");
    if (!savedTheme || savedTheme === "null" || savedTheme === "material.blue.light") {
      localStorage.setItem("dx-theme", "material.blue.light.compact");
      localStorage.setItem("nombreTema", "Blue Light Compact");
    }

    // Aplicar tema y despachar acción para obtener temas
    themes.current(savedTheme);
    dispatch(getTemas());

  }, [dispatch]);
  return (
    <div className="App">
      {/* Mostrar el popup de licencia si la licencia ha expirado */}
     
      {/* Rutas de la aplicación */}
      <Routes>
        <Route path='/' element={<Empresas />} />  {/* Ruta raíz */}
        <Route path='/empresas' element={<Empresas />} />
        <Route path='/calendario/:idServicio/:idUnidad/:idSucursal' element={<Calendario />} />
        <Route path='/filtroCalendario' element={<FiltroCalendario />} />
        <Route path='/creareditar/:idTurno/:idServicio/:idUnidad/:idSucursal' element={<EditarCrearTurno />} />
        <Route path='/BloquearSalas' element={<BloquearSalaForm />} />
        <Route path='/VerTurnosSalas' element={<CalendarioFull />} />
        {/* Ruta por defecto (Redirección a la raíz en caso de no coincidencia) */}
        <Route path="*" element={<Navigate to="/" />} />

3      </Routes>
    </div>
  );
}

export default App;
