import { message } from 'antd';
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

export const createProduto = async (body, tipo) => {
    const endpoint = tipo === "LIVRO" ? 'produtos/livros/' : 'produtos/ebooks/';

    try {
        const response = await api.post(endpoint, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const data = error.response.data;

            const mensagens = Object.keys(data).map((campo) => {
                const erroProprio = data[campo];
                return `${campo}: ${Array.isArray(erroProprio) ? erroProprio.join("; ") : erroProprio}`;
            });

            const mensagemFinal = mensagens.join(" | ");
            
            message.error(mensagemFinal);
        } else {
            message.error("Erro de conexão ou erro interno do servidor.");
        }
        
        throw error;
    }
}

export const getCategorias = async () => {
    const response = await api.get('produtos/categorias');

    return(response.data);
}