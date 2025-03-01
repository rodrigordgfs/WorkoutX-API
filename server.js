import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./src/routes/index.js";
import environment from "./src/config/envs.js";
import { startJobs } from "./src/jobs/index.js";
import { clerkPlugin } from "@clerk/fastify";

startJobs();

const app = fastify({
  pluginTimeout: 60000,
});

app.register(cors, {
  origin: "*",
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
