import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService){}

    async signIn(mail: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(mail);
      const isMatch = await bcrypt.compare(pass, user.password);
        if(user && isMatch){
            const {password, ...result } = user;
            return result;
        }
        return null;
    }

    async signUp(user: Partial<User>): Promise<any> {
        if(user.password===undefined){
            const genSalt = await bcrypt.genSalt(); 
            console.log(genSalt);
            user.password = genSalt;
          }
          const salt = 10;  
          const hash = await bcrypt.hash(user.password, salt)
          user.password = hash;
        const newUser = this.userService.create(user)
    }
}
