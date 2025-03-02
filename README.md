# AnticiPay Web

O AnticiPay Web é o front-end de uma aplicação desenvolvida em React que permite que empresas solicitem a antecipação de recebíveis. A aplicação calcula o valor a ser antecipado com base nas notas fiscais cadastradas e no limite de crédito disponível, que varia de acordo com o faturamento mensal e o ramo de atuação da empresa.

## Tecnologias e Ferramentas

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **ReactJS**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **Vite**: Ferramenta de build rápida para desenvolvimento moderno.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Shadcn/UI**: Biblioteca de componentes UI altamente customizáveis.
- **React Query**: Gerenciamento de estado e cache de dados para requisições assíncronas.
- **Radix UI**: Biblioteca de componentes primitivos acessíveis e sem estilos pré-definidos.

## Estrutura de Diretórios

A estrutura do projeto está organizada da seguinte forma:

```plaintext
anticipay-web/
├── public/              # Arquivos estáticos (imagens, favicon, etc.)
├── src/                 # Código-fonte da aplicação
│   ├── api/             # Configurações e chamadas à API
│   ├── components/      # Componentes reutilizáveis
│   ├── constants/       # Constantes e valores fixos
│   ├── contexts/        # Contextos do React para gerenciamento de estado global
│   ├── lib/             # Utilitários e funções auxiliares
│   └── pages/           # Componentes de páginas da aplicação
├── .gitignore           # Arquivo para ignorar arquivos no versionamento
├── index.html           # Ponto de entrada da aplicação
├── package.json         # Dependências e scripts do projeto
└── README.md            # Documentação do projeto
```

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

1. Clone o repositório:

```sh
git clone https://github.com/brenonPerez/anticipay-web.git
```

2. Instale as dependências:

```sh
cd anticipay-web
npm install
```

3. Execute o projeto:

```sh
npm run dev
```

4. Acesse a aplicação no navegador:

Abra o navegador e acesse:

```sh
http://localhost:5173
```

## Configuração do Projeto

### Requisitos

- Node.js 14+ e npm instalados.

### Variáveis de Ambiente

Para configurar as variáveis de ambiente, crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável:

```env
REACT_APP_API_URL=http://localhost:5000/api
```
