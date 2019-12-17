import { Account, AccountType } from "./auth/models/account";
import { dbAddConnectCb } from "./db";
import { Connection, getManager } from "typeorm";
import { Category } from "./product/models/category";
import { useExpressServer, ExpressErrorMiddlewareInterface, Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import * as express from "express";
import { ROOT_DIR } from "./core";
import { join } from "path";
import { authService } from './auth/services/auth';


export async function testAccounts(connection: Connection) {
    const user = new Account();
    user.username = "Timber";
    user.password = "Saw";
    user.atype = AccountType.UsernamePassword;
    const repository = connection.getRepository(Account);
    await repository.save(user);

    const allUsers = await repository.find();
    const firstUser = await repository.findOne(1); // find by id
    const timber = await repository.findOne({ username: "Timber" });
    console.log(allUsers, '\n', firstUser, '\n', timber);
}

export async function testCategory(_connection: Connection) {
    const manager = getManager();

    const a1 = new Category();
    a1.name = "a1";
    await manager.save(a1);

    const a11 = new Category();
    a11.name = "a11";
    a11.parent = a1;
    await manager.save(a11);

    const a12 = new Category();
    a12.name = "a12";
    a12.parent = a1;
    await manager.save(a12);

    const a111 = new Category();
    a111.name = "a111";
    a111.parent = a11;
    await manager.save(a111);

    const a112 = new Category();
    a112.name = "a112";
    a112.parent = a11;
    await manager.save(a112);

    const trees = await manager.getTreeRepository(Category).findTrees();

    console.log(JSON.stringify(trees));
}


//addCallback(main)
function startApi() {
    let app = express.default();
    app.use('/static',express.static(join(ROOT_DIR, 'storage')));
    useExpressServer(app, {
        routePrefix: "/api",
        controllers: [
            __dirname + "/auth/controllers/*js",
            __dirname + "/product/controllers/*js",
        ],
        defaultErrorHandler: false,
        authorizationChecker:authService.authorizationChecker.bind(authService)
    })
    app.listen(3000);
}
@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, _request: any, response: any, _next: (err: any) => any) {
        console.log("error...");
        response.status(error.status || 500)
            .json({
                name: error.name,
                message: error.message,
                status: error.httpCode,
                stack: error.stack,
            })
    }
}
@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {

    use(_request: any, _response: any, next: (err?: any) => any): void {
        console.log("do something...");
        next();
    }

}
dbAddConnectCb(startApi)