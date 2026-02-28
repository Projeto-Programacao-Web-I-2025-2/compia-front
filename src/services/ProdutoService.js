import { message } from 'antd';

const MOCK_PRODUTOS = [
    { id: 1, nome: "Ai Engineering", preco: 250.00 },
    { id: 2, nome: "IA para líderes: do conceito à realidade: Um método prático para implementar IA na sua empresa, impulsionar a produtividade e acelerar a inovação", preco: 18.90 },
    { id: 3, nome: "2041: Como a inteligência artificial vai mudar sua vida nas próximas décadas", preco: 45.00 },
    { id: 4, nome: "Introdução à Inteligência Artificial: uma Abordagem Não Técnica", preco: 320.00 },
];

export const getEstabelecimentos = async ({filtros}) => {
    try {
        
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_PRODUTOS);
            }, 300);
        });
    } catch (error) {
        message.error("Erro ao carregar os produtos!");
        return [];
    }
};