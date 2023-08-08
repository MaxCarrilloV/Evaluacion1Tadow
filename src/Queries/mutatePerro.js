import clienteAxios from '../Helpers/clienteAxios';

export const mutatePerro = async (form) => {
    const { data } = await clienteAxios.post('/perro/registrar',form);
    return data;
} 