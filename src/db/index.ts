import { createConnection, Connection } from "typeorm";
let connectCallbacks: DbCb[] = [];
let connection: Connection | undefined;
type DbCb = (con: Connection) => void;
export function dbAddConnectCb(cb: DbCb) {
    if (connection && connection.isConnected) {
        cb(connection);
    } else {
        connectCallbacks.push(cb);
    }
};
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "ecomm",
    password: "123456",
    database: "ecomm",
    entities: [
        __dirname + "/../auth/models/*.js",
        __dirname + "/../product/models/*.js",
    ],
    synchronize: true,
    logging: true
}).then(connection => {
    for (const cb of connectCallbacks) {
        cb(connection);
    }
}).catch(error => console.log(error));