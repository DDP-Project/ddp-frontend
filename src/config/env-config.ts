import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_FE_ENDPOINT: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_FE_ENDPOINT: process.env.NEXT_PUBLIC_FE_ENDPOINT,
});

if (!configProject.success) {
  throw new Error(
    `Config env for project invalid: ${configProject.error.errors}`
  );
}

const envConfig = configProject.data;

export default envConfig;
