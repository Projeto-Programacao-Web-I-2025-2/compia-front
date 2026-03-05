import api from './api';

export const getProdutos = async ({filtros}) => {
    const response = await api.get('produtos/');
    
    return(response.data.results);
};

export const getProdutoById = async ({id}) => {
    const response = await api.get(`produtos/${id}`);
    
    console.log(response.data)
    return(response.data);
};

export const createProduto = async (body) => {
    const responde = await api.post('produtos/', body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },});

    return(responde.data);
}