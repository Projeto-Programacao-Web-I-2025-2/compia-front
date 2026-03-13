import api from "./api";
import { message } from "antd";

export const getClienteById = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
   
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }
};

export const getVendedorById = async (id) => {
  try {
    const response = await api.get(`/vendedores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vendedor:', error);
    throw error;
  }   
};

export const atualizarUsuario = async ({nome}) => {
  try {
    const response = await api.patch('/auth/users/me/', { nome });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};


export const atualizarSenha = async ({senhaAtual, novaSenha}) => {
  try {
    const response = await api.post('/auth/users/set_password/', { new_password: novaSenha, current_password: senhaAtual });
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
};