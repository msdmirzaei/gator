import { setUser } from "./config";
import { createUser } from "./lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if(args.length === 0) {
        console.log("the login handler expects a single argument, the username");
        process.exit(1);
    }
     
    try {
        const user = await createUser(args[0]);
        setUser(user.name);
        console.log("user was created.");
        console.log(user);
    } catch(err: unknown) {
        if(err instanceof Error) {
            console.log(`Error: ${err.message}`);
            process.exit(1);
        }
        console.log("unknow error");
        process.exit(1);
    }
    
}