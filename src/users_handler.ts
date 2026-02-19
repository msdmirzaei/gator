import { readConfig } from "./config";
import { getUsers } from "./lib/db/queries/users";


export async function handerUsers(cmdName: string, ...args: string[]) {
    const cfg = readConfig();
    const users = await getUsers();
    for(const user of users) {
        if(user.name === cfg.currentUserName) {
            console.log(`* ${user.name} (current)`);
            continue;
        }
        console.log(`* ${user.name}`);
    }
}