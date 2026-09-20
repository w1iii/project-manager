import { Controller, Post, Get, Body, Param } from 'nestjs/common';
import { AuthService } from './auth.service.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  //LOGIN
  //SIGNUP
  //CHECK TOKEN IF VALID USER TOKEN SESSION
  //UPDATE USER
  //LOGOUT
}
