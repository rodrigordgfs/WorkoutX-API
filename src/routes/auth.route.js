import authController from "../controllers/auth.controller.js";

const auth = async (fastify) => {
  fastify.post("/auth", authController.postAuth);
  fastify.patch("/auth/:id/", authController.patchAuth);
};

export default auth;
