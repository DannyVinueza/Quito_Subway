import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .required('El nombre de la ruta es requerido')
        .test('unique-nombre', 'La ruta ya existe', async function (value) {
            const response = await fetch('https://64d053feff953154bb78c692.mockapi.io/metro?nombre=' + value);
            const data = await response.json();
            return !data || data.length === 0;
        }),
    sector: Yup.string().required('El sector es requerido'),
    salida: Yup.string().required('El punto de salida es requerido'),
    llegada: Yup.string().required('El punto de llegada es requerido'),
    maquinista: Yup.string().required('El nombre del maquinista es requerido'),
    detalles: Yup.string().required('Los detalles son requeridos'),
});
// Validar.js

