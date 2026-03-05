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