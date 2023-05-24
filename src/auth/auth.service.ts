import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async validateUser(mail: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(mail);
        if(user && user.password === pass){
            const {password, ...result } = user;
            return result;
        }
        return null;
    }
}
