import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule} from '@nestjs/config';
import * as dotenv from "dotenv";
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';

dotenv.config();

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const APPKEY: string = process.env.APPKEY ?? ""
const APPSECRET: string = process.env.APPSECRET ?? ""

console.log("APP KEY: ", APPKEY)
console.log("APP SECRET: ", APPSECRET)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ObserveModule.forRoot({
      appKey: APPKEY,
      appSecret: APPSECRET,
      serviceId: 'task-buddy',
    }),
    DatabaseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
