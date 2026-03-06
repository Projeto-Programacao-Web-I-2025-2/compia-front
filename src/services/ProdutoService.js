import api from './api';

export const getProdutos = async (filtros) => {
    const response = await api.get(`produtos/${filtros}`);
    
    return(response.data.results);
};

export const getProdutoById = async ({id}) => {
    const response = await api.get(`produtos/${id}`);
    
    console.log(response.data)
    return(response.data);
};

export const createProduto = async (body) => {
    const response = await api.post('produtos/', body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },});

    return(response.data);
}

export const getCategorias = async () => {
    const response = await api.get('produtos/categorias');

    return(response.data);
}