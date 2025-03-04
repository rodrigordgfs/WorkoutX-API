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

app.register(cors, {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
});

app.register(clerkPlugin, {
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

app.register(routes);

app
  .listen({
    port: environment.port,
    host: process.env.host,
  })
  .then(() => {
    console.log(`Server is running on port ${environment.port}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
