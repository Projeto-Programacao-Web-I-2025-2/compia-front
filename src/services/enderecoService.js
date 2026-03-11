import api from "./api";
import { message } from "antd";
import axios from "axios";

export const buscaCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        if (response.data.erro) {
            message.error("CEP não encontrado.")
            return;
        }
        return response.data;
    } catch (err) {
        console.log("Erro ao buscar CEP:", err);
        return null;
    }
}

export const enderecoUser = async () => {
    const user = await api.get("/auth/users/me/");

    try {
        if (user.data.role === "CLIENTE") {
            const response = await api.get('/clientes/me/');
            return response.data.endereco;
        } 

        const response = await api.get('/vendedores/me/');
        return response.data.endereco;
    } catch (err) {
        console.log("Erro ao carregar endereço:", err);
        return;
    }
}

export const cadastrarEndereco = async ({rua, numero, bairro, cidade, estado, complemento, cep}) => {
    const user = await api.get("/auth/users/me/");

    try {
        if (user.data.role === "CLIENTE") {
            const response = await api.patch('clientes/me/' , {endereco: {rua, numero, bairro, cidade, estado, complemento, cep}});
            return response.data;
        }

        const response = await api.patch('vendedores/me/' , {endereco: {rua, numero, bairro, cidade, estado, complemento, cep}});
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
        }

        throw error
    }
}
