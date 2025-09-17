import "dotenv/config";

const environment = {
  env: process.env.ENV,
  port: parseInt(process.env.PORT),
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
};

export default environment;
