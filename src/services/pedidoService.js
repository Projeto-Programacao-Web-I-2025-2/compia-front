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

export const atualizaStatusPedido = async (pedidoId, status) => {
    try {
        const response = await api.patch(`/pedidos/${pedidoId}/`, {status})
        return response.data;
    } catch (err) {
        console.log(err.data);
    }
}

export const atualizaFretePedido = async (pedidoId, frete) => {
    try {
        const response = await api.patch(`/pedidos/${pedidoId}/`, {frete})
        return response.data;
    } catch (err) {
        console.log(err.data);
    }
}

export const getPedidoById = async ({id}) => {
    try {
        const response = await api.get(`/pedidos/${id}/`)
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

