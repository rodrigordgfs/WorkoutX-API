import { getAuth } from "@clerk/fastify";

const clerkAuth = async (request, reply) => {
  try {
    const { userId } = await getAuth(request);

    if (!userId) {
      return reply.status(401).send({ error: "Usuário não autenticado" });
    }

    // Adicionar o userId ao request para uso nos controllers
    request.userId = userId;
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return reply.status(401).send({ error: "Falha na autenticação" });
  }
};

export default clerkAuth;
