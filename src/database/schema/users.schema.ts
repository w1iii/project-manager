
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  hash_password: varchar('name', { length: 20 }).notNull(),
})
