import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { IsPublic } from './auth/decorators';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    ) {}

  @IsPublic()
  @UseGuards(/* before local-auth.guard: AuthGuard('local')*/ LocalAuthGuard)
  @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
    getProfile(@Request() req) {
      return req.user;
  }

}
