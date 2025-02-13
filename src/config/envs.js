import "dotenv/config";

const environment = {
  port: parseInt(process.env.PORT),
  // jwt_secret: process.env.JWT_SECRET,
  // redis_url: process.env.REDIS_URL,
};

export default environment;
