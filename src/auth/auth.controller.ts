import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Get()
  checkserver(){
    return "working"
  }

  //LOGIN
  @Post("/login")
  loginuser(@Body() body: any){
    return this.authService.login(body)
  }

  //SIGNUP
  @Post("/signup")
  signupUser(@Body() body: any){
    return this.authService.signup(body)
  }
  //CHECK TOKEN IF VALID USER TOKEN SESSION
  //UPDATE USER
  //LOGOUT
}
