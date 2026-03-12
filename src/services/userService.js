import api from "./api";

export const getClienteById = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
   
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }
};
