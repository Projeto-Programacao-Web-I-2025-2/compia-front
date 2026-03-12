import api from "./api";

export const criaPedido = async (carrinhosIds) => {
    const body = carrinhosIds.map(([id, qtd]) => ({produto: id, quantidade: qtd}));

    try {
        const response = await api.post('/pedidos/', {itens: body, status: "ABERTO"})
        return response.data;
    } catch (err) {
        console.log(err.data);
    }
}

export const getMeusPedidos = async () => {
     try {
        const response = await api.get('/pedidos/')
        return response.data;
    } catch (err) {
        console.log(err.data);
    }
}

