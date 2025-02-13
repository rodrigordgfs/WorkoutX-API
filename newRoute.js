// createEndpoint.js
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const createEndpoint = (routeName) => {
  // Nome formatado
  const formattedName = routeName.toLowerCase();

  // Diretórios
  const folders = {
    controller: `./src/controllers/${formattedName}.controller.js`,
    service: `./src/services/${formattedName}.service.js`,
    repository: `./src/repositories/${formattedName}.repository.js`,
    route: `./src/routes/${formattedName}.route.js`,
  };

  // Templates de cada arquivo
  const templates = {
    controller: `// ${formattedName}.controller.js
const controller = async (request, reply) => {
  // Implementação do controller
};

export default {
  controller
};`,
    
    service: `// ${formattedName}.service.js
const service = async () => {
  // Implementação do serviço
};

export default {
  service
};`,

    repository: `// ${formattedName}.repository.js
import { prisma } from "../libs/prisma.js";

const repository = async () => {
  // Implementação do repositório
};

export default {
  repository
};`,

    route: `// ${formattedName}.js
import authMiddleware from "../middlewares/authMiddleware.js";

const ${formattedName} = async (fastify) => {
  // Definição das rotas usando Fastify
};

export default ${formattedName};
`
  };

  // Função para criar arquivos e pastas
  for (const [key, filePath] of Object.entries(folders)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, templates[key]);
    console.log(`${key} criado: ${filePath}`);
  }
};

// Função para capturar o nome da rota interativamente
const promptRouteName = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Por favor, forneça o nome da rota: ', (routeName) => {
    if (!routeName) {
      console.log('Nome da rota não pode ser vazio.');
      rl.close();
      process.exit(1);
    } else {
      createEndpoint(routeName);
      rl.close();
    }
  });
};

// Executar o script com o nome da rota como argumento ou solicitar interativamente
const [,, routeName] = process.argv;
if (routeName) {
  createEndpoint(routeName);
} else {
  promptRouteName();
}
