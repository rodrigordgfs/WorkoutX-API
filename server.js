import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./src/routes/index.js";
import environment from "./src/config/envs.js";
// import { startJobs } from "./src/jobs/index.js";
import { clerkPlugin } from "@clerk/fastify";

// startJobs();

const app = fastify({
  pluginTimeout: 60000,
  bodyLimit: 10 * 1024 * 1024,
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
});

app.register(clerkPlugin, {
  secretKey: environment.clerkSecretKey,
  publishableKey: environment.clerkPublishableKey,
});

app.register(routes);

app
  .listen({
    port: environment.port || 3000,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on port ${environment.port || 3000}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });