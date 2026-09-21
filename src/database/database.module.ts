import { Global, Module } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DATABASE, databaseProvider } from './database.provider.js';


@Module({
  providers: [ databaseProvider],
  exports: [DATABASE]
})

export class DatabaseModule {}
