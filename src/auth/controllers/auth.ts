import { JsonController, Post, Body, Authorized, Get } from "routing-controllers";
import { LoginDto } from '../dtos/login';
import { authService } from '../services/auth';

@JsonController()
export class AuthController {
    @Authorized("USER")
    @Get('/auth')
    async getAccount(){
        return 'ok';
    }
    @Post('/auth')
    async auth(@Body() c:LoginDto){
        const a = await authService.validateUsernamePassword(c.username,c.password)
        if(!a){
            throw 'AuthenticationFailed';
        }
        return {
            token:authService.createToken(a)
        }
    }
}