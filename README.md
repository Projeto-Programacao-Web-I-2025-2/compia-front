# COMPIA Front-end

Interface web da plataforma de **e-commerce da editora COMPIA**, especializada em materiais bibliográficos sobre **Inteligência Artificial**.

Este projeto foi desenvolvido utilizando **React + Vite** e consome uma **API RESTful em Django**, oferecendo uma experiência de compra moderna e eficiente.

---

## Tecnologias Utilizadas

- **React 18+**
- **Vite** (Build tool e servidor de desenvolvimento)
- **Axios** (Consumo de API)
- **React Router DOM** (Gerenciamento de rotas)
- **Context API** (Gerenciamento de estado global, como o carrinho)
- **Tailwind CSS ou CSS Modules** (Estilização)

---

## Requisitos

Antes de executar o projeto, é necessário ter instalado:

- **Node.js (versão 18 ou superior)**
- **npm ou yarn**
- **Git**

---

## Instalação

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

## Executando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```

---

## Estrutura do Projeto

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

## Funcionalidades

### Catálogo de Produtos
Visualização e busca de materiais bibliográficos relacionados à área de **Inteligência Artificial**.

### Sistema de Carrinho
- Adição de produtos
- Remoção de produtos
- Persistência de itens no carrinho

### Autenticação
- Cadastro de usuários
- Login de usuários e vendedores

### Gestão de Pedidos
- Acompanhamento de compras
- Histórico de pedidos

### Perfil do Usuário
- Gerenciamento de endereços
- Atualização de dados pessoais
- Informações da conta

---

## Integração com Backend

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
