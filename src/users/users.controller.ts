import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, Query, UseFilters } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiSecurity, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import * as bcrypt from 'bcryptjs';

@Controller('users')
@ApiTags('users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  //get all users
  @Get() 
  @ApiOkResponse({ description: 'Users retrieved successfully.'})
  // @ApiNotFoundResponse({ description: 'User not found.'})
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //get user by id
  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully.'})
  @ApiNotFoundResponse({ description: 'User not found.'}) 
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }
  
  // get user by email 
  @Get(':email')
  @ApiOkResponse({ description: 'User retrieved successfully.'})
  @ApiNotFoundResponse({ description: 'User not found.'}) 
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  // create user
  @Post()
  @ApiCreatedResponse({ description: 'User created successfully'})
  @ApiUnprocessableEntityResponse({ description: 'User title already esists.'})
  async create(@Body() user: User): Promise<User> {
    if(user.password===undefined){
      const genSalt = await bcrypt.genSalt(); 
      console.log(genSalt);
      user.password = genSalt;
    }
    const salt = 10;  
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;
    return this.userService.create(user);
  }

  // update user
  @Put(':id')
  @ApiOkResponse({ description: 'User updated successfully'}) 
  @ApiNotFoundResponse({ description: 'User not found.'})
  @ApiUnprocessableEntityResponse({ description: 'User title already exists.'})
  async update (@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.userService.update(id, user);
  }

  // delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    // handle error if user does not exist
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userService.delete(id);
  }
}

