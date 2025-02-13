import fastify from "fastify";
import cors from "@fastify/cors";
// import environment from "./config/envs.js";
// import routes from "./routes/index.js";
// import redisCache from './libs/redis.js'

const app = fastify({
  logger: true,
  pluginTimeout: 60000
});

// app.register(redisCache);
app.register(cors, {
  origin: "*",
});
// app.register(routes);

app
  .listen({ port: environment.port, host: "0.0.0.0" })
  .then(() => {
    console.log(`Server is running on port ${environment.port}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
