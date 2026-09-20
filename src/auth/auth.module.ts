import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authService } from './auth.service';


@Module({
  imports: [],
  controllers: [authController],
  providers: [authService],
  exports: [],
})
export class AuthModule {}
