import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify'; // Importa toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de toast
import Mensajes from "./Mensajes";
import { validationSchema } from "./Validar";

export const Formulario = ({ setEstado, idMetro }) => {
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState(false);

    const initialValues = {
        nombre: "",
        sector: "",
        salida: "",
        llegada: "",
        maquinista: "",
        detalles: ""
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (Object.values(values).some(value => value === "")) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1000);
                return;
            }

            if (idMetro) {
                const url = `https://64d053feff953154bb78c692.mockapi.io/metro/${idMetro}`;
                await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: { 'Content-Type': 'application/json' }
                });
                setEstado(true);
                setTimeout(() => {
                    setEstado(false);
                }, 1000);
                toast.success("Ruta actualizada"); // Muestra un toast de éxito
            } else {
                const url = "https://64d053feff953154bb78c692.mockapi.io/metro";
                values.id = uuidv4();
                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: { 'Content-Type': 'application/json' }
                });
                setMensaje(true);
                setEstado(true);
                setTimeout(() => {
                    setMensaje(false);
                    setEstado(false);
                }, 1000);
                toast.success("Ruta registrada"); // Muestra un toast de éxito
            }

            resetForm();

        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema,
    });

    useEffect(() => {
        if (idMetro) {
            (async function () {
                try {
                    const respuesta = await (await fetch(`https://64d053feff953154bb78c692.mockapi.io/metro/${idMetro}`)).json();
                    const { id, nombre, sector, salida, llegada, maquinista, detalles } = respuesta;
                    formik.setValues({
                        ...formik.values,
                        nombre,
                        sector,
                        salida,
                        llegada,
                        maquinista,
                        detalles,
                        id
                    });
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [idMetro]);

    return (
        <form onSubmit={formik.handleSubmit}>
            {error && <Mensajes tipo="bg-red-900">Existen campos vacíos</Mensajes>}
            {mensaje && <Mensajes tipo="bg-green-900">Registro exitoso</Mensajes>}
<div>
            <label htmlFor='nombre' className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la ruta'
                    name='nombre'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                    <div className='text-red-600'>{formik.errors.nombre}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor='sector' className='text-gray-700 uppercase font-bold text-sm'>Sector: </label>
                <input
                    id='sector'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='sector de la ruta'
                    name='sector'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sector}
                />
                {formik.touched.sector && formik.errors.sector ? (
                    <div className='text-red-600'>{formik.errors.sector}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor='salida' className='text-gray-700 uppercase font-bold text-sm'>Punto de salida: </label>
                <input
                    id='salida'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de salida'
                    name='salida'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.salida}
                />
                {formik.touched.salida && formik.errors.salida ? (
                    <div className='text-red-600'>{formik.errors.salida}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor='llegada' className='text-gray-700 uppercase font-bold text-sm'>Punto de llegada: </label>
                <input
                    id='llegada'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de llegada'
                    name='llegada'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.llegada}
                />
                {formik.touched.llegada && formik.errors.llegada ? (
                    <div className='text-red-600'>{formik.errors.llegada}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor='maquinista' className='text-gray-700 uppercase font-bold text-sm'>Nombre del maquinista: </label>
                <input
                    id='maquinista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del maquinista'
                    name='maquinista'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.maquinista}
                />
                {formik.touched.maquinista && formik.errors.maquinista ? (
                    <div className='text-red-600'>{formik.errors.maquinista}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor='detalles' className='text-gray-700 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.detalles}
                />
                {formik.touched.detalles && formik.errors.detalles ? (
                    <div className='text-red-600'>{formik.errors.detalles}</div>
                ) : null}
            </div>


            <input
                type="submit"
                className='bg-sky-900 w-full p-3 
        text-white uppercase font-bold rounded-lg 
        hover:bg-red-900 cursor-pointer transition-all'
                value={formik.values.id ? "Actualizar ruta" : "Registrar ruta"} 
                /*onClick={(e) => {
                    if (Object.values(formik.values).some(value => value === "")) {
                        e.preventDefault(); // Evita que el formulario se envíe
                        toast.error("Llena todos los campos antes de registrar"); // Muestra un toast de error
                    }
                }}*//>
           
        </form>
    );
};
