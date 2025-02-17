import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: process.env.MISTRAL_BASE_URL,
  apiKey: process.env.MISTRAL_API_KEY,
});

export default openai;
