import { Controller, Body, HttpCode, Param, Get, Post, NotFoundException, HttpStatus, UseFilters } from '@nestjs/common';
// import { UserService } from '../users/users.service'; 
// import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
// import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('auth')
@ApiTags('authentication')
@UseFilters(new HttpExceptionFilter)
export class AuthController {
    constructor(private authService: AuthService) {}

    // @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() signInDto: Record<string, any>){ 
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    // @HttpCode(HttpStatus.OK)
    @Post('signUp')
    signUp(@Body() user: Record<string, any>){
        return this.authService.signUp(user);
    } 
    // @HttpCode(HttpStatus.OK)
    // @Post('forgotPassword')
    // forgotPassword(@Body() user: Record<string, any>){
    //     return this.authService.forgotPassword(user);
    // } 
}
