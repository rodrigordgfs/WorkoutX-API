import fastify from "fastify";
import routes from "./src/routes/index.js";
import environment from "./src/config/envs.js";
import { startJobs } from "./src/jobs/index.js";
import { clerkPlugin } from "@clerk/fastify";
import cors from "@fastify/cors";

startJobs();

const app = fastify({
  pluginTimeout: 60000,
  bodyLimit: 10 * 1024 * 1024,
});

// 🔥 O CORS DEVE SER REGISTRADO PRIMEIRO 🔥
app.register(cors, {
  origin: true,  // ✅ Permite qualquer origem, mas de forma dinâmica
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // ✅ Garante que os métodos são permitidos
  allowedHeaders: ["Content-Type", "Authorization"],  // ✅ Apenas cabeçalhos necessários
  credentials: true,  // ✅ Permite cookies e autenticação
  preflightContinue: false,
  optionsSuccessStatus: 204
});

// 🔥 Clerk deve vir depois do CORS 🔥
app.register(clerkPlugin, {
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

// 🔥 Rotas devem vir depois do CORS 🔥
app.register(routes);

app
  .listen({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
