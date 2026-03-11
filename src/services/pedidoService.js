import api from "./api";
import { useCarrinho } from "../contexts/CarrinhoContext";

export const criaPedido = async (carrinhosIds) => {
    const body = carrinhosIds.map(([id, qtd]) => ({produto: id, quantidade: qtd}));

    try {
        const response = await api.post('/pedidos/', {itens: body})
        localStorage.removeItem('carrinhoIds');

        return response.data;
    } catch (err) {
        console.log(err.data);
    }
}

export const getMeusPedidos = async () => {
     try {
        const response = await api.get('/pedidos/')

        console.log(response.data.results)
        return response.data.results;
    } catch (err) {
        console.log(err.data);
    }
}

