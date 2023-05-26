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
        // Verify whether the password is correct or not.
      const isMatch = await bcrypt.compare(pass, user.password);
        if(user && isMatch){
            const {password, ...result } = user;
            return result;
        }
        return null;
    }

    async signUp(user: Partial<User>): Promise<any> {

        // If password is not set this if clouse will generate strong password for us.
        if(user.password===undefined){
            const genSalt = await bcrypt.genSalt(); 
            console.log(genSalt);
            user.password = genSalt;
          }
        
        //   Advanced encryption system password hashing.
          const salt = 10;  
          const hash = await bcrypt.hash(user.password, salt)
          user.password = hash;
        const newUser = this.userService.create(user)
    }
 
}
