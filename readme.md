# Sistema de Gerenciamento de Produtos

Este repositório contém a aplicação de um módulo para um sistema de gerenciamento de produtos, semelhante ao utilizado em plataformas como iFood. A aplicação utiliza Nest.js no backend, React no frontend e PostgreSQL como banco de dados.

### Pré-requisitos:

Antes de executar a aplicação, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

### Como executar a aplicação:

1. Clone este repositório:

```javascript
git clone https://github.com/fhilipemonteiro/menu_fullstack.git
```

2. Navegue até o diretório raiz do projeto:

```javascript
cd menu_fullstack
```

3. Execute o seguinte comando para iniciar a aplicação utilizando Docker Compose:

```javascript
docker-compose up
```

Este comando irá construir e iniciar os contêineres Docker para o backend, frontend e banco de dados.

### Estrutura do Projeto:

- /backend: Contém o código-fonte do backend desenvolvido em Nest.js.
- /frontend: Contém o código-fonte do frontend desenvolvido em React.
- /db: Contém alguns dados do banco de dados que já será inicializado com algumas informações.
- docker-compose.yml: Arquivo de configuração do Docker Compose para construir e iniciar os contêineres da aplicação.
