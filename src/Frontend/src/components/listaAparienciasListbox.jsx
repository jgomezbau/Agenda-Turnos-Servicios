import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTemas } from '../actions/temas';

export function ListaApariencias() {
    const dispatch = useDispatch()
    const temas = useSelector((state) => state.temas);
    const [selected] = useState(localStorage.getItem("nombreTema"))
    const nombreArchivoTemas = [];
    const nombreTemas = [];
    temas.forEach(element => {
        nombreTemas.push(element.nombre)
        nombreArchivoTemas.push(element.dx_temas)
    })
    const cambiarTema = (e) => {
        //console.log(e)
        temas.forEach(element => {
            
                localStorage.setItem("dx-theme", e.dx_temas);
                localStorage.setItem("nombreTema", e.nombre);
          
        })
    }

    useEffect(() => {
        dispatch(getTemas())
    }, [dispatch])
    return (
        <div className="h-6 w-full ">
            <Listbox value={selected} onChange={cambiarTema}>
                <div className="relative ">
                    <Listbox.Button className=" w-full cursor-default  py-1 pl-2 pr-10 text-left  focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 sm:text-sm">
                        <span className="block truncate text-gray-900">Apariencias</span>
                       
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {temas.map((tema, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={tema}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {tema.nombre}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
