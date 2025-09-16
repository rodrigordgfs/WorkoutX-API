import authController from "../controllers/auth.controller.js";

const auth = async (fastify) => {
  fastify.post("/auth", authController.postAuth);
};

export default auth;
