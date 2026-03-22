<h1 align="center">
<img src="https://raw.githubusercontent.com/Projeto-Programacao-Web-I-2025-2/compia-front/main/assets/logo.png" width="240" height="220" style="margin-top: 2rem"/>
</h1>

## Conteúdos
- [Descrição](#descricao)
- [Principais Telas e Funcionalidades](#principais-telas)
  - [Página Inicial](#home)
  - [Página do Produto](#produto)
  - [Carrinho](#carrinho)
  - [Acompanhamento de Pedidos](#pedidos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalacao)
- [Executando a Aplicação](#executando)
- [Estrutura do Projeto](#estrutura)
- [Integração com Backend](#integracao)
---
<h2 id="descricao">Descrição</h2>

O **CompIA** é uma plataforma experimental de e-commerce que simula a venda de materiais bibliográficos voltados à área da Inteligência Artificial.

O projeto foi desenvolvido para representar, de forma prática, o funcionamento de uma loja virtual especializada em livros técnicos, unindo um design intuitivo com um catálogo organizado de conteúdos relevantes da área.

A aplicação foi construída utilizando React + Vite no front-end e consome uma API RESTful desenvolvida em Django, proporcionando uma experiência de compraeficiente.

---
<h2 id="principais-telas">Principais Telas e Funcionalidades</h2>

### <a name="home">Página Inicial</a>
Na **Página inicial** é possível realizar buscas personalizadas para encontrar livros específicos, além de explorar o acervo através de filtros avançados de categoria, idioma e tipo (e-book ou livro físico). Para facilitar a sua decisão, a plataforma também oferece a opção de ordenar os produtos por preço (crescente ou decrescente), garantindo que você encontre a melhor produto para o seu objetivo.

<p align="center">
  <img width="750" alt="home" src="https://raw.githubusercontent.com/Projeto-Programacao-Web-I-2025-2/compia-front/main/assets/compia-home.png" />
</p>

### <a name="produto">Página do Produto</a>
Na **Página do Produto**, é possível visualizar todas as informações essenciais sobre o livro, como título, autor, descrição e demais detalhes relevantes, permitindo uma análise completa antes da compra.

Além disso, a plataforma oferece a funcionalidade de cálculo de frete, possibilitando ao usuário verificar prazos e custos de entrega de forma prática. Para dar continuidade à compra, também é possível adicionar o item diretamente ao carrinho, tornando o processo simples e intuitivo.
<p align="center">
  <img width="750" alt="produto" src="https://raw.githubusercontent.com/Projeto-Programacao-Web-I-2025-2/compia-front/main/assets/compia-produto.png" />
</p>

### <a name="carrinho">Carrinho</a>
Na **Página do Carrinho**, o usuário pode visualizar os produtos selecionados e acompanhar os detalhes da compra.

É possível alterar a quantidade de itens de cada produto, remover itens individualmente ou limpar todo o carrinho. Ao final, o usuário pode prosseguir para o pagamento e concluir o pedido.
<p align="center">
  <img width="750" alt="carrinho" src="https://raw.githubusercontent.com/Projeto-Programacao-Web-I-2025-2/compia-front/main/assets/compia-carrinho.png" />
</p>

### <a name="pedidos">Acompanhamento de Pedidos</a>
Na **Página de Pedidos**, o usuário pode acompanhar todas as compras realizadas, visualizando o status atualizado de cada pedido em tempo real.

Também é possível consultar os produtos incluídos em cada compra, com seus respectivos detalhes. Além disso, notificações por e-mail são enviadas para informar qualquer mudança no status dos pedidos, mantendo o usuário sempre atualizado.

<p align="center">
  <img width="750" alt="pedidos" src="https://raw.githubusercontent.com/Projeto-Programacao-Web-I-2025-2/compia-front/main/assets/compia-pedidos.png" />
</p>

---

<h2 id="tecnologias-utilizadas"> Tecnologias Utilizadas</h2>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

---

## <a name="requisitos"></a>Requisitos

Antes de executar o projeto, é necessário ter instalado:

- **Node.js (versão 18 ou superior)**
- **npm ou yarn**
- **Git**

---

## <a name="instalacao"></a>Instalação

Clone o repositório:

```bash
git clone https://github.com/Projeto-Programacao-Web-I-2025-2/compia-front
```

Entre na pasta do projeto:

```bash
cd compia-front
```

Instale as dependências:

```bash
npm install
```

---

## <a name="executando"></a>Executando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```

---

## <a name="estrutura"></a>Estrutura do Projeto

```
compia-front/
│
├── src/
│   ├── components/    # Componentes reutilizáveis (cards, headers, auth)
│   ├── contexts/      # Estados globais (CarrinhoContext)
│   ├── pages/         # Páginas principais da aplicação
│   ├── services/      # Integração com a API (Axios)
│   ├── router/        # Configuração das rotas
│   ├── App.jsx        # Componente raiz
│   └── main.jsx       # Ponto de entrada da aplicação
│
├── public/            # Arquivos estáticos públicos
├── package.json       # Dependências e scripts
├── vite.config.js     # Configurações do Vite
└── README.md
```

---

## <a name="integracao"></a>Integração com Backend

O front-end se comunica com uma API desenvolvida em **Django REST Framework**.

A comunicação é realizada utilizando **Axios**, com uma instância configurada para:

- Definir automaticamente a **base URL da API**
- Enviar requisições no formato **JSON**
- Incluir automaticamente o **token de autenticação** armazenado no `localStorage`

A autenticação utiliza o header HTTP:

```
Authorization: Token <token>
```

A URL da API pode ser configurada através da variável de ambiente:

```
VITE_API_URL
```

Caso essa variável não seja definida, o sistema utiliza como padrão:

```
http://127.0.0.1:8000/api/
```

Esse endereço assume que o **backend está sendo executado na mesma máquina que o front-end**.

Caso a API esteja hospedada em outro servidor ou computador, a variável `VITE_API_URL` deve ser configurada com a URL correspondente.

Exemplo:

```
VITE_API_URL=http://localhost:8000/api/
```

ou

```
VITE_API_URL=https://api.seudominio.com/api/
```

---

Projeto desenvolvido para a disciplina de **Programação Web**.
