import logoMetro from '../assets/tren.webp';
import Mensajes from './Mensajes';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listar = ({ estado, setIdmetro }) => {
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        if (estado || rutas.length >= 0) {
            (async function () {
                try {
                    const respuesta = await (await fetch('https://64d053feff953154bb78c692.mockapi.io/metro')).json();
                    setRutas(respuesta);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [estado]);

    const handleDelete = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta ruta?');
        if (confirmar) {
            try {
                const url = `https://64d053feff953154bb78c692.mockapi.io/metro/${id}`;
                await fetch(url, {
                    method: 'DELETE',
                });
                const nuevasRutas = rutas.filter((ruta) => ruta.id !== id);
                setRutas(nuevasRutas);
                toast.success('Ruta eliminada correctamente');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            {rutas.length === 0 ? (
                <Mensajes tipo={'bg-green-900'}>No existen rutas creadas</Mensajes>
            ) : (
                rutas.map((ruta) => (
                    <div className="p-2 rounded-xl sm:flex gap-12 bg-gray-200 shadow-xl mb-5" key={ruta.id}>
                        <img src={logoMetro} alt="art cover" className="sm:w-3/12 object-cover rounded-lg" />

                        <div className="h-auto p-3 w-full">
                            <h4 className="text-2xl font-semibold text-cyan-900">{ruta.nombre}</h4>
                            <hr className="w-full border border-gray-300 my-2" />
                            <p className="text-gray-500">Sector: {ruta.sector}</p>
                            <p className="text-gray-500">Punto de salida: {ruta.salida}</p>
                            <p className="text-gray-500">Punto de llegada: {ruta.llegada}</p>
                            <p className="text-gray-500">Maquinista: {ruta.maquinista}</p>
                            <p className="text-gray-500">Detalles: {ruta.detalles}</p>
                            <div className="flex justify-between mt-3 lg:justify-end md:justify-end gap-3">
                                <button
                                    className="bg-sky-900 text-white px-6 py-1 rounded-full"
                                    onClick={() => {
                                        setIdmetro(ruta.id);
                                    }}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="bg-red-900 text-white px-6 py-1 rounded-full"
                                    onClick={() => {
                                        handleDelete(ruta.id);
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Listar;
