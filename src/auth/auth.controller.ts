import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    return await this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() signUpDto: AuthDto) {
    return await this.authService.signUp(signUpDto);
  }
}
