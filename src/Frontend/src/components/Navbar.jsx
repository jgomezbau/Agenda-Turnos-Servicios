import React, { Fragment, useEffect, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../actions';
import { ListaApariencias } from "./listaaparienciasListBox";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
    const entorno = process.env.REACT_APP_NODE_ENV || 'desconocido'; // Cargar entorno de variables de entorno
    const VersionFrontEnd = process.env.REACT_APP_VERSION || '1.0.0'; // Cargar versión de variables de entorno por defecto

    let tema = "";
    if (localStorage.getItem('dx-theme')) {
        tema = localStorage.getItem('dx-theme').replace(/\./g, '');
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cerrarSesion = useCallback(() => {
        dispatch(logout(localStorage.getItem('userID'))).then(setTimeout(myFunction, 1000));
        function myFunction() {
            navigate("/");
            window.location.href = redirectUrl;
            window.close();
            window.location.reload();
        }
    }, [dispatch, navigate, redirectUrl]);

    useEffect(() => {
        const beforeunload = (event) => {
            event.preventDefault();
            cerrarSesion();
        };
        window.addEventListener('beforeunload', beforeunload);

        return () => {
            window.removeEventListener('beforeunload', beforeunload);
        };
    }, [cerrarSesion]);

    return (
        <div className={`fixed z-10 w-full border-b-2 ${tema} h-20 flex justify-between items-center px-8`}>
            {/* Imagen/logo en el margen izquierdo */}
            <a className={`${tema}`} href="/">
                <div className="logo-image">
                    <img src="img.png" alt="Logo" style={{ marginRight: '40px' }} /> {/* Separación de la imagen */}
                </div>
            </a>

            {/* Contenedor de los textos */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Texto de la versión alineado a la izquierda */}
                <div style={{ textAlign: 'left', marginLeft: '20px' }}>
                    Versión: {VersionFrontEnd}
                </div>

                {/* Texto en el centro resaltado */}
                <div style={{ textAlign: 'center', flex: 1, fontSize: '20px', fontWeight: 'bold' }}>
                    Jardín del Pilar sa
                </div>

                {/* Texto del entorno alineado a la derecha */}
                <div style={{ textAlign: 'right', marginRight: '20px' }}>
                    Entorno: {entorno}
                </div>
            </div>

            {/* Botón en el margen derecho */}
            <ul className="flex items-center">
                <li className={`p-4`}>
                    <Menu as="div" className="relative inline-block text-left">
                        <div className={`${tema}`}>
                            <Menu.Button
                                className={`inline-flex justify-center w-full rounded-md border-2 ${tema}
                                shadow-sm px-4 py-2 text-sm font-medium text-gray-700 opacity-60
                                hover:opacity-100 focus:outline-none  focus:ring-offset-gray-100`}
                            >
                                {localStorage.getItem("User")}
                                <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5 ${tema}`} aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg
                                bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                <div className="py-1 bg-white">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div className={classNames(active ? "bg-gray-100" : "", "px-4 py-2")}>
                                                <ListaApariencias />
                                            </div>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={cerrarSesion}
                                                className={classNames(
                                                    active ? "text-gray-900" : "text-gray-700 bg-white",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                Cerrar sesión
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
