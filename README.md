# Currículo Backend

API REST desenvolvida para a atividade **Currículo Express**, da disciplina de **Aplicações Orientadas a Serviço (AOS)**.

O projeto utiliza **Node.js, Express e PostgreSQL**, com o banco de dados hospedado no **NeonDB** e acesso aos dados realizado por meio do **Sequelize**.

A API permite cadastrar e gerenciar informações de currículos, incluindo perfis, experiências acadêmicas, experiências profissionais, projetos e tecnologias utilizadas.

## Tecnologias

* Node.js
* Express
* PostgreSQL
* Sequelize
* NeonDB

## Funcionalidades

Atualmente, a API possui:

* CRUD completo de perfis
* CRUD completo de experiências acadêmicas
* CRUD completo de experiências profissionais
* CRUD completo de projetos
* CRUD completo de tecnologias
* Relacionamento entre perfis e suas experiências
* Relacionamento N:N entre projetos e tecnologias
* Consulta de um currículo completo
* Validação de registros relacionados
* Tratamento de erros da API
* Endpoint de verificação de funcionamento da aplicação

## Modelo de dados

O banco de dados é composto pelas seguintes entidades:

* `Profile`
* `AcademicExperience`
* `ProfessionalExperience`
* `Project`
* `Technology`
* `ProjectTechnology`

### Relacionamentos

```text
Profile
  ├── 1:N ── AcademicExperience
  ├── 1:N ── ProfessionalExperience
  └── 1:N ── Project
                  │
                  └── N:N ── Technology
```

O relacionamento entre `Project` e `Technology` é realizado por meio da tabela intermediária `ProjectTechnology`.

## Estrutura do projeto

```text
src/
├── config/
│   ├── database.js
│   └── syncDatabase.js
│
├── controllers/
│   ├── academicExperienceController.js
│   ├── professionalExperienceController.js
│   ├── profileController.js
│   ├── projectController.js
│   └── technologyController.js
│
├── middlewares/
│   └── errorHandler.js
│
├── models/
│   ├── academicExperience.js
│   ├── professionalExperience.js
│   ├── profile.js
│   ├── project.js
│   ├── projectTechnology.js
│   ├── technology.js
│   └── index.js
│
├── routes/
│   ├── academicExperienceRoutes.js
│   ├── professionalExperienceRoutes.js
│   ├── profileRoutes.js
│   ├── projectRoutes.js
│   └── technologyRoutes.js
│
├── services/
│   ├── academicExperienceService.js
│   ├── professionalExperienceService.js
│   ├── profileService.js
│   ├── projectService.js
│   └── technologyService.js
│
├── app.js
└── server.js

database/
└── seed.js
```

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_URL=sua_connection_string_do_neon_db
CORS_ORIGIN=*
```

A variável `DATABASE_URL` deve conter a connection string do banco PostgreSQL utilizado no NeonDB.

O arquivo `.env` não deve ser enviado para o GitHub.

## Banco de dados

Para sincronizar os modelos com o banco de dados:

```bash
npm run db:sync
```

Para inserir os dados iniciais:

```bash
npm run db:seed
```

O seed inicial contém dados de **dois currículos**, utilizados para validar a estrutura e os relacionamentos da aplicação.

## Executando o projeto

Para iniciar o servidor em ambiente de desenvolvimento:

```bash
npm run dev
```

Por padrão, a API estará disponível em:

```text
http://localhost:3000
```

## Endpoints

### Health Check

```http
GET /
GET /health
```

### Profiles

```http
GET    /profiles
GET    /profiles/:profileId
GET    /profiles/:profileId/full
POST   /profiles
PUT    /profiles/:profileId
DELETE /profiles/:profileId
```

### Academic Experiences

```http
GET    /academic-experiences
GET    /academic-experiences/:academicExperienceId
POST   /academic-experiences
PUT    /academic-experiences/:academicExperienceId
DELETE /academic-experiences/:academicExperienceId
```

### Professional Experiences

```http
GET    /professional-experiences
GET    /professional-experiences/:professionalExperienceId
POST   /professional-experiences
PUT    /professional-experiences/:professionalExperienceId
DELETE /professional-experiences/:professionalExperienceId
```

### Projects

```http
GET    /projects
GET    /projects/:projectId
POST   /projects
PUT    /projects/:projectId
DELETE /projects/:projectId
```

### Technologies

```http
GET    /technologies
GET    /technologies/:technologyId
POST   /technologies
PUT    /technologies/:technologyId
DELETE /technologies/:technologyId
```

### Relacionamento entre Projetos e Tecnologias

```http
GET    /projects/:projectId/technologies
POST   /projects/:projectId/technologies
DELETE /projects/:projectId/technologies/:technologyId
```

## Códigos HTTP utilizados

A API utiliza códigos de resposta HTTP de acordo com o resultado das operações, incluindo:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

## Autor

**João Vitor Cruz de Menezes**

[GitHub](https://github.com/JvCruzM)

[LinkedIn](https://www.linkedin.com/in/jvcruzm/)
