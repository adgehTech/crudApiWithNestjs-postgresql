import { Controller, Body, HttpCode, Param, Get, Post, NotFoundException, HttpStatus, UseFilters } from '@nestjs/common';
// import { UserService } from '../users/users.service'; 
// import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
// import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('auth')
@ApiTags('auth')
@UseFilters(new HttpExceptionFilter)
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Get('signIn')
    signIn(@Body() signInDto: Record<string, any>){
        // return ({ "userId":232})
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signUp')
    signUp(@Body() user: Record<string, any>){
        
        return this.authService.signUp(user);
    }

      // const isMatch = await bcrypt.compare(password, hash)

  // get user by email 
//   @Post(':email')
//   @ApiOkResponse({ description: 'User retrieved successfully.'})
//   @ApiNotFoundResponse({ description: 'User not found.'}) 
//   async findOneByEmail(@Param('email') email: string): Promise<User> {
//     const user = await this.userService.findOneByEmail(email);
//     if (!user) {
//       throw new NotFoundException('User does not exist!');
//     } else {
//       return user;
//     }
//   }
}
