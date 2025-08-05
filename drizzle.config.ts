/** biome-ignore-all lint/style/noNonNullAssertion: DATABASE_URL is guaranteed to be defined in the environment */
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
