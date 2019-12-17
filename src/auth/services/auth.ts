import { getConnection } from "typeorm";
import { Account } from '../models/account';
import { sign, verify } from "jsonwebtoken";
import { Action } from 'routing-controllers';



class Auth {
    private expSecs = 30 * 24 * 3600;
    private secret = '@@##$$1234';
    async validateUsernamePassword(username: string, password: string) {
        const a = await getConnection().getRepository(Account).findOne({ username: username });
        if (!a || a.password != password) {
            return null;
        }
        return a;
    }
    createToken(a: Account) {
        return sign({
            data: { id: a.id }
        }, this.secret, { expiresIn: this.expSecs });
    }
    configure(secret: string, expSecs: number) {
        this.expSecs = expSecs || this.expSecs;
        this.secret = secret || this.secret;
    }
    async authorizationChecker(action: Action, roles: string[]) {        
        const token = action.request.headers["authorization"] as string;
        if(!token){
            throw "NoToken";            
        }
        const r = verify(token.substring(7),this.secret);
        console.log(action.request.headers["authorization"],r,roles);        
        return true;
    }
}

export const authService = new Auth