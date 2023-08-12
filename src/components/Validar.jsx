import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    sector: Yup.string().required('El sector es requerido'),
    salida: Yup.string().required('El punto de salida es requerido'),
    llegada: Yup.string().required('El punto de llegada es requerido'),
    maquinista: Yup.string().required('El nombre del maquinista es requerido'),
    detalles: Yup.string().required('Los detalles son requeridos'),
});
