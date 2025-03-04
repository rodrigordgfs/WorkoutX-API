![Logo](https://workoutx-bucket.s3.us-east-2.amazonaws.com/app/banner.png)

# API WorkoutX

## Descrição

API WorkoutX é uma API RESTful construída com Node.js, Fastify e Prisma, projetada para gerenciar treinos e exercícios. Ela oferece funcionalidades para autenticação de usuários, gerenciamento de grupos musculares, criação e gerenciamento de treinos, além de acompanhamento do histórico de atividades físicas.

## Tecnologias Utilizadas

-   Node.js
-   Fastify
-   Prisma
-   PostgreSQL
-   AWS S3
-   OpenAI (Mistral AI)
-   Clerk (Autenticação)

## Diagrama de Relacionamento

![Diagrama de Relacionamento](https://workoutx-bucket.s3.us-east-2.amazonaws.com/api/prisma-erd.svg)

## Pré-requisitos

-   Node.js instalado
-   Docker (opcional, para execução do PostgreSQL)
-   Conta na Clerk para autenticação
-   Conta na AWS para utilização do S3
-   Chave da API OpenAI (Mistral AI)

## Configuração

1.  Clone o repositório:

    ```bash
    git clone <repositorio>
    cd api-workoutx
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes variáveis:

    ```env
    ENV=
    HOST=
    PORT=
    DATABASE_URL=
    MISTRAL_API_KEY=
    MISTRAL_BASE_URL=
    YOUTUBE_API_KEY=
    YOUTUBE_BASE_URL=
    CLERK_PUBLISHABLE_KEY=ZGV2JA
    CLERK_SECRET_KEY=
    AWS_REGION=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    ```

4.  Execute as migrações do Prisma:

    ```bash
    npx prisma migrate dev
    ```

5.  Opcional: Popular o banco de dados com dados de exemplo:

    ```bash
    npm run seed
    ```

## Execução

1.  Inicie o servidor:

    ```bash
    npm run dev
    ```

    O servidor estará disponível em `http://localhost:3000`.

## Endpoints

### Autenticação

-   `POST /auth`: Cria um novo usuário.
    -   Corpo da requisição:

        ```json
        {
          "name": "Nome do Usuário",
          "userId": "ID do Usuário",
          "avatar": "URL do Avatar"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Usuário",
          "name": "Nome do Usuário",
          "avatar": "URL do Avatar",
          "experience": null,
          "publicProfile": false,
          "goal": null,
          "height": null,
          "weight": null
        }
        ```

-   `PATCH /auth/:id`: Atualiza um usuário existente.
    -   Parâmetros da rota:
        -   `id`: ID do usuário a ser atualizado.
    -   Corpo da requisição:

        ```json
        {
          "name": "Novo Nome do Usuário",
          "avatar": "Nova URL do Avatar",
          "goal": "WEIGHT_LOSS",
          "experience": "BEGINNER",
          "height": 170,
          "weight": 70,
          "publicProfile": true
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Usuário",
          "name": "Novo Nome do Usuário",
          "avatar": "Nova URL do Avatar",
          "experience": "BEGINNER",
          "publicProfile": true,
          "goal": "WEIGHT_LOSS",
          "height": 170,
          "weight": 70
        }
        ```

### Grupos Musculares

-   `POST /muscle-group`: Cria um novo grupo muscular.
    -   Corpo da requisição:

        ```json
        {
          "name": "Nome do Grupo Muscular",
          "description": "Descrição do Grupo Muscular",
          "image": "Imagem em Base64"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Grupo Muscular",
          "name": "Nome do Grupo Muscular",
          "description": "Descrição do Grupo Muscular",
          "image": "URL da Imagem",
          "createdAt": "Data de Criação",
          "updatedAt": "Data de Atualização"
        }
        ```

-   `GET /muscle-group`: Lista todos os grupos musculares.
    -   Resposta:

        ```json
        [
          {
            "id": "ID do Grupo Muscular",
            "name": "Nome do Grupo Muscular",
            "description": "Descrição do Grupo Muscular",
            "image": "URL da Imagem"
          }
        ]
        ```

-   `GET /muscle-group/:id`: Retorna um grupo muscular específico.
    -   Parâmetros da rota:
        -   `id`: ID do grupo muscular a ser retornado.
    -   Resposta:

        ```json
        {
          "id": "ID do Grupo Muscular",
          "name": "Nome do Grupo Muscular",
          "description": "Descrição do Grupo Muscular",
          "image": "URL da Imagem",
          "exercises": []
        }
        ```

-   `DELETE /muscle-group/:id`: Deleta um grupo muscular específico.
    -   Parâmetros da rota:
        -   `id`: ID do grupo muscular a ser deletado.

### Treinos

-   `POST /workout`: Cria um novo treino.
    -   Corpo da requisição:

        ```json
        {
          "name": "Nome do Treino",
          "visibility": "PUBLIC" ou "PRIVATE",
          "userId": "ID do Usuário",
          "exercises": [
            {
              "id": "ID do Exercício",
              "series": "Número de Séries",
              "repetitions": "Número de Repetições",
              "weight": "Peso",
              "restTime": "Tempo de Descanso"
            }
          ]
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Treino",
          "name": "Nome do Treino",
          "visibility": "PUBLIC" ou "PRIVATE",
          "userId": "ID do Usuário",
          "exercises": [
            {
              "id": "ID do Exercício",
              "series": "Número de Séries",
              "repetitions": "Número de Repetições",
              "weight": "Peso",
              "restTime": "Tempo de Descanso"
            }
          ]
        }
        ```

-   `POST /workout/:idWorkout/user/:idUser/like`: Adiciona ou remove um like de um treino.
    -   Parâmetros da rota:
        -   `idWorkout`: ID do treino.
        -   `idUser`: ID do usuário.
    -   Resposta:

        ```json
        {
          "message": "Curtido com sucesso" ou "Descurtido com sucesso"
        }
        ```

-   `POST /workout/ai`: Cria um novo treino com auxílio da IA.
    -   Corpo da requisição:

        ```json
        {
          "userId": "ID do Usuário",
          "objective": "Objetivo do Usuário",
          "muscleGroup": "Grupo Muscular",
          "trainingTime": "Tempo de Treino",
          "experienceLevel": "Nível de Experiência",
          "frequency": "Frequência Semanal",
          "duration": "Duração do Treino",
          "location": "Local de Treino",
          "equipments": [],
          "hasPhysicalLimitations": false,
          "limitationDescription": "Descrição das Limitações",
          "preferredTrainingStyle": "Estilo de Treino",
          "nutrition": "Nutrição",
          "sleepQuality": "Qualidade do Sono"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Treino",
          "name": "Nome do Treino",
          "exercises": []
        }
        ```

-   `GET /workout`: Lista todos os treinos.
    -   Query parameters:
        -   `userId` (opcional): ID do usuário.
        -   `visibility` (opcional): `PUBLIC` ou `PRIVATE`.
        -   `likes` (opcional): `true` para incluir likes.
        -   `exercises` (opcional): `true` para incluir exercícios.
    -   Resposta:

        ```json
        [
          {
            "id": "ID do Treino",
            "name": "Nome do Treino",
            "visibility": "PUBLIC" ou "PRIVATE",
            "userId": "ID do Usuário",
            "exercises": []
          }
        ]
        ```

-   `DELETE /workout/:idWorkout/exercise/:idExercise`: Deleta um exercício de um treino.
    -   Parâmetros da rota:
        -   `idWorkout`: ID do treino.
        -   `idExercise`: ID do exercício.

-   `POST /workout/:id/copy`: Copia um treino para outro usuário.
    -   Parâmetros da rota:
        -   `id`: ID do treino a ser copiado.
    -   Corpo da requisição:

        ```json
        {
          "userId": "ID do Novo Usuário"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Treino Copiado",
          "name": "Nome do Treino",
          "visibility": "PRIVATE",
          "userId": "ID do Novo Usuário",
          "exercises": []
        }
        ```

-   `DELETE /workout/:id`: Deleta um treino.
    -   Parâmetros da rota:
        -   `id`: ID do treino a ser deletado.

### Sessões de Treino

-   `GET /workout/session/:sessionId`: Retorna uma sessão de treino específica.
    -   Parâmetros da rota:
        -   `sessionId`: ID da sessão de treino.
    -   Resposta:

        ```json
        {
          "id": "ID da Sessão de Treino",
          "startedAt": "Data de Início",
          "endedAt": "Data de Término",
          "endedByService": false,
          "user": {
            "id": "ID do Usuário",
            "name": "Nome do Usuário"
          },
          "workout": {
            "id": "ID do Treino",
            "name": "Nome do Treino"
          },
          "exercises": []
        }
        ```

-   `POST /workout/session`: Cria uma nova sessão de treino.
    -   Corpo da requisição:

        ```json
        {
          "userId": "ID do Usuário",
          "workoutId": "ID do Treino"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID da Sessão de Treino",
          "startedAt": "Data de Início",
          "endedAt": null,
          "endedByService": false,
          "user": {
            "id": "ID do Usuário",
            "name": "Nome do Usuário"
          },
          "workout": {
            "id": "ID do Treino",
            "name": "Nome do Treino"
          },
          "exercises": []
        }
        ```

-   `DELETE /workout/session/:sessionId`: Deleta uma sessão de treino.
    -   Parâmetros da rota:
        -   `sessionId`: ID da sessão de treino a ser deletada.

-   `POST /workout/session/:sessionId/complete`: Finaliza uma sessão de treino.
    -   Parâmetros da rota:
        -   `sessionId`: ID da sessão de treino a ser finalizada.
    -   Resposta:

        ```json
        {
          "id": "ID da Sessão de Treino",
          "startedAt": "Data de Início",
          "endedAt": "Data de Término",
          "endedByService": false,
          "user": {
            "id": "ID do Usuário",
            "name": "Nome do Usuário"
          },
          "workout": {
            "id": "ID do Treino",
            "name": "Nome do Treino"
          },
          "exercises": []
        }
        ```

-   `PATCH /workout/session/:sessionId/exercise/:exerciseId/complete`: Marca um exercício como completo em uma sessão de treino.
    -   Parâmetros da rota:
        -   `sessionId`: ID da sessão de treino.
        -   `exerciseId`: ID do exercício.
    -   Corpo da requisição:

        ```json
        {
          "completed": true,
          "weight": "Peso Utilizado",
          "repetitions": "Repetições Realizadas",
          "series": "Séries Realizadas"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID da Sessão de Treino",
          "startedAt": "Data de Início",
          "endedAt": null,
          "endedByService": false,
          "user": {
            "id": "ID do Usuário",
            "name": "Nome do Usuário"
          },
          "workout": {
            "id": "ID do Treino",
            "name": "Nome do Treino"
          },
          "exercises": []
        }
        ```

-   `GET /workout/session`: Retorna uma sessão de treino específica pelo ID do treino.
    -   Query parameters:
        -   `workoutId`: ID do treino.
    -   Resposta:

        ```json
        {
          "id": "ID da Sessão de Treino",
          "startedAt": "Data de Início",
          "endedAt": "Data de Término",
          "endedByService": false,
          "user": {
            "id": "ID do Usuário",
            "name": "Nome do Usuário"
          },
          "workout": {
            "id": "ID do Treino",
            "name": "Nome do Treino"
          },
          "exercises": []
        }
        ```

### Histórico de Treinos

-   `GET /workout/history`: Lista o histórico de treinos de um usuário.
    -   Query parameters:
        -   `userId`: ID do usuário.
        -   `name` (opcional): Termo de pesquisa para o nome do treino.
        -   `period` (opcional): Período do histórico (`last_month`, `last_3_months`, `last_year`, `all`).
        -   `status` (opcional): Status do treino (`completed`, `in_progress`, `all`).
        -   `order` (opcional): Ordenação do histórico (`asc`, `desc`).
    -   Resposta:

        ```json
        [
          {
            "id": "ID da Sessão de Treino",
            "startedAt": "Data de Início",
            "endedAt": "Data de Término",
            "duration": "Duração do Treino",
            "workout": {
              "name": "Nome do Treino",
              "visibility": "PUBLIC" ou "PRIVATE",
              "createdAt": "Data de Criação"
            },
            "exercises": [],
            "stats": {
              "totalExercises": 0,
              "completedExercises": 0,
              "completionRate": "0%"
            }
          }
        ]
        ```

### Dashboard de Treinos

-   `GET /workout/dashboard`: Retorna dados para o dashboard de treinos de um usuário.
    -   Query parameters:
        -   `userId`: ID do usuário.
    -   Resposta:

        ```json
        {
          "workoutMonthAmmount": 0,
          "workoutPercentageChange": "0.00",
          "consecutiveWorkoutDays": 0,
          "averageWorkoutDuration": 0,
          "completionRate": "0.00",
          "workoutExercises": [],
          "recentActivities": [],
          "volumeWorkoutExercises": {}
        }
        ```

### Exercícios

-   `POST /exercise`: Cria um novo exercício.
    -   Corpo da requisição:

        ```json
        {
          "name": "Nome do Exercício",
          "muscleGroupId": "ID do Grupo Muscular",
          "series": "Número de Séries",
          "repetitions": "Número de Repetições",
          "weight": "Peso",
          "restTime": "Tempo de Descanso",
          "videoUrl": "URL do Vídeo",
          "image": "Imagem em Base64",
          "instructions": "Instruções"
        }
        ```

    -   Resposta:

        ```json
        {
          "id": "ID do Exercício",
          "muscleGroupId": "ID do Grupo Muscular",
          "name": "Nome do Exercício",
          "series": "Número de Séries",
          "repetitions": "Número de Repetições",
          "weight": "Peso",
          "restTime": "Tempo de Descanso",
          "imageUrl": "URL da Imagem",
          "videoUrl": "URL do Vídeo",
          "instructions": "Instruções",
          "createdAt": "Data de Criação",
          "updatedAt": "Data de Atualização"
        }
        ```

-   `GET /exercise`: Lista todos os exercícios.
    -   Query parameters:
        -   `muscleGroupId` (opcional): ID do grupo muscular.
    -   Resposta:

        ```json
        [
          {
            "id": "ID do Exercício",
            "muscleGroupId": "ID do Grupo Muscular",
            "name": "Nome do Exercício",
            "series": "Número de Séries",
            "repetitions": "Número de Repetições",
            "weight": "Peso",
            "restTime": "Tempo de Descanso",
            "imageUrl": "URL da Imagem",
            "videoUrl": "URL do Vídeo",
            "instructions": "Instruções"
          }
        ]
        ```

## Suporte

Para suporte, mande um email para shinodalabs@gmail.com.

## Autores

- [@rodrigordgfs](https://www.github.com/rodrigordgfs)

## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de shinodalabs@gmail.com
