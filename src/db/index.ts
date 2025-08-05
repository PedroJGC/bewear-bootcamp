import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

// biome-ignore lint/style/noNonNullAssertion: DATABASE_URL is guaranteed to be defined in the environment
export const db = drizzle(process.env.DATABASE_URL!)
