import api from "./api";

export const getVendas = async () => {
    try {
      const response = await api.get('/vendas');

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      throw error;
    }
  }

export const getVendasById = async (id) => {
    try {
      const response = await api.get(`/vendas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar venda com ID ${id}:`, error);
      throw error;
    }
}
