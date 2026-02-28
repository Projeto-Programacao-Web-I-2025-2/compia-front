import { message } from 'antd';

const MOCK_PRODUTOS = [
    { id: 1, autor: "Aasdasd", nome: "Ai Engineering", preco: 250.00, descricao: "A próxima onda, de Mustafa Suleyman e Michael Bhaskar, é um alerta urgente sobre os riscos que a inteligência artificial e outras tecnologias em rápido desenvolvimento representam para o mundo, e o que é possível fazer para evitá-los enquanto ainda há tempo."},
    { id: 2, autor: "Aasdasd", nome: "IA para líderes: do conceito à realidade: Um método prático para implementar IA na sua empresa,IA para líderes: do conceito à realidade: Um método prático para implementar IA na sua empresa,IA para líderes: do conceito à realidade: Um método prático para implementar IA na sua empresa,IA para líderes: do conceito à realidade: Um método prático para implementar IA na sua empresa, impulsionar a produtividade e acelerar a inovação", preco: 18.90, descricao: "Em IA para líderes: do conceito à realidade, Vinicius David guia executivos e gestores para não apenas entender, mas implementar a inteligência artificial de maneira estratégica e em escala em suas organizações, aumentando a produtividade, impulsionando a inovação e preparando as empresas para os desafios do futuro."},
    { id: 3, autor: "Aasdasd", nome: "2041: Como a inteligência artificial vai mudar sua vida nas próximas décadas", preco: 45.00, descricao: "Saindo do clichê dos livros teóricos e cheios de conceitos incompreensíveis ao público leigo, Kai-Fu Lee, fundador da Google China e autor do best-seller Inteligência artificial, e Chen Qiufan, um dos grandes nomes do sci-fi, apresentam ao leitor dez contos que mostram de forma divertida concepções que podem se tornar uma realidade até 2041. Ainda que alguns deles pareçam saídos de um filme de ficção científica, outros serão facilmente reconhecidos pelo leitor como parte do seu cotidiano.Cada conto de Chen Qiufan é acompanhado por uma análise de Kai-Fu Lee sobre como a tecnologia apresentada na trama fará em breve parte de nossas vidas. Os temas vão desde carros sem motoristas e robôs que farão todo o trabalho que consideramos entediante até novas formas de educação e de cuidados com aqueles que estão prestes a partir. Os autores apresentam de maneira simples e direta temas que poderiam, de outro modo, soar complexos, ao mesmo tempo em que refletem sobre como a inteligência artificial já é uma realidade para nós.2041 demonstra como o mundo pode ser daqui a duas décadas em uma obra dedicada não apenas aos leitores que se interessam por tecnologia, mas também a todos aqueles que desejam ter um vislumbre de como serão os próximos anos."},
    { id: 4, autor: "Aasdasd", nome: "Introdução à Inteligência Artificial: uma Abordagem Não Técnica", preco: 320.00, descricao: "A inteligência artificial envolve praticamente todas as partes do seu dia. Embora seja inicialmente possível assumir que tecnologias como alto-falantes inteligentes e assistentes digitais sejam sua extensão, a ia tornou-se rapidamente uma tecnologia de uso geral, repercutindo em diversos setores – como transportes, saúde, serviços financeiros e muito mais. Na era moderna, a compreensão da ia e suas possibilidades para uma empresa é essencial para que se alcancem crescimento e sucesso. O livro introdução à inteligência artificial A inteligência artificial envolve praticamente todas as partes do seu dia. Embora seja inicialmente possível assumir que tecnologias como alto-falantes inteligentes e assistentes digitais sejam sua extensão, a ia tornou-se rapidamente uma tecnologia de uso geral, repercutindo em diversos setores – como transportes, saúde, serviços financeiros e muito mais. Na era moderna, a compreensão da ia e suas possibilidades para uma empresa é essencial para que se alcancem crescimento e sucesso. O livro introdução à inteligência artificial che chega para equipar os leitores com uma compreensão fundamental e oportuna da ia e seu impacto. O autor tom taulli oferece uma introdução atraente e não técnica a conceitos importantes, como machine learning (aprendizagem de máquina), deep learning (aprendizagem profunda), natural language processing (pnl – processamento da linguagem natural), robótica e muito mais. Além de guiá-lo por estudos de caso do mundo real e etapas práticas de implementação, taulli usa sua experiência para expandir as questões mais amplas que cercam a ia. Isso inclui tendências sociais, ética e impacto futuro que a ia causará nos governos, estruturas de empresas e vida cotidiana do mundo. Google, amazon, facebook e outras gigantes da tecnologia estão longe de ser as únicas organizações que tiveram – e continuarão a ter – resultados incrivelmente significativos. A ia é o presente e o futuro das empresas e das residências. Assim, intensificar suas habilidades no assunto será inestimável para sua preparação para o futuro da tecnologia, e este livro é o guia indispensável que você estava procurando."},
];

export const getProduto = async ({filtros}) => {
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

export const getProdutoById = async ({id}) => {
    try {
        
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_PRODUTOS.find(p => p.id == id));
            }, 2300);
        });
    } catch (error) {
        message.error("Erro ao carregar os produtos!");
        return [];
    }
};