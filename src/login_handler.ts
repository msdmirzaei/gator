import { setUser } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";


export async function handlerLogin(cmdName: string, ...args: string[]) {
    if(args.length === 0) {
        console.log("the login handler expects a single argument, the username");
        process.exit(1);
    }
    const user = await getUser(args[0]);
    if(!user){
        console.log("user doesn't exists");
        process.exit(1);
    }
    console.log(user);
    setUser(args[0]);
    console.log("user has been set");
}