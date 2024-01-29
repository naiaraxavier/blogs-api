# API de Blogs 📚✨
**API de Blogs** é um projeto que visa desenvolver uma API e um banco de dados para a produção de conteúdo em um blog. Utilizando Node.js e o pacote Sequelize, a aplicação realiza operações CRUD (Create, Read, Update e Delete) de posts, seguindo os princípios do REST.

## Objetivo 🚀
O objetivo central é proporcionar uma infraestrutura eficiente para a produção de conteúdo em um blog. O projeto enfatiza a relação entre usuários e posts, sendo necessário um usuário com login para realizar postagens. Além disso, a API incorpora a utilização de categorias, estabelecendo relações entre posts e categorias.

## Habilidades Trabalhadas 💡
- Desenvolvimento de uma API com arquitetura em camadas MVC.
- Utilização do pacote Sequelize para interações com o banco de dados.
- Implementação de endpoints REST para operações de CRUD.
- Trabalho com Docker para facilitar o ambiente de desenvolvimento.
- Relações complexas entre usuários, posts e categorias.

## Como Usar 🛠️
**Pré-requisitos:**

Certifique-se de ter o Node.js e o Docker instalados na sua máquina.

## Passos para Executar a Aplicação 🚀

**Usando Docker:**

Certifique-se de ter o Docker instalado. Execute o seguinte comando para subir a aplicação:

```bash
docker compose up blogs_api
```

Execute o comando abaixo para acessar o terminal interativo do container:

```bash
docker exec -it blogs_api bash
```

Instale as dependências necessárias:

```bash
npm install
```

Execute os comandos conforme necessário dentro do container.

**Executando Localmente:**

Instale as dependências:

```bash
npm install
```

Execute os comandos conforme necessário.

**Acesso à Aplicação :globe_with_meridians:**

Abra o navegador e acesse http://127.0.0.1:3001/ para interagir com a API de Blogs.

## Contribuições 💪
### Desenvolvido por Mim
#### Arquivos e Pastas
- src/controllers/categories.js
- src/controllers/index.js
- src/controllers/post.js
- src/controllers/users.js
- src/middlewares/validations/schemas.js
- src/middlewares/authentication.js
- src/middlewares/checkCategory.js
- src/middlewares/checkLogin.js
- src/middlewares/checkPost.js
- src/middlewares/checkUser.js
- src/routes/categoriesRoutes.js
- src/routes/index.js
- src/routes/loginRoutes.js
- src/routes/postRoutes.js
- src/routes/userRoutes.js
- src/services/categories.js
- src/services/index.js
- src/services/post.js
- src/services/users.js
- src/utils/mapStatusHTTP.js
- src/utils/token.js

### Desenvolvido pela Trybe
Arquivos e pastas não mencionados como desenvolvidos por mim está relacionada ao desenvolvimento pela Trybe.
