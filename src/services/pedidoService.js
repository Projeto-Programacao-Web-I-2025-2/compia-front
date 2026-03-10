import api from "./api";
import { useCarrinho } from "../contexts/CarrinhoContext";

export const criaPedido = async (carrinhosIds) => {
    const body = carrinhosIds.map(([id, qtd]) => ({produto: id, quantidade: qtd}));

    console.log(body);

    try {
        const response = await api.post('/pedidos/', {itens: body})
        return response.data;
    } catch (err) {
        console.log(err.data);
    }
} 