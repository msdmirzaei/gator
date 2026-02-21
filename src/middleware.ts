import { CommandHandler, UserCommandHandler } from "./command_handler";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";


export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]): Promise<void> => {
        const cfg = readConfig();
        const currentUser = await getUser(cfg.currentUserName);
        if(!currentUser) {
            throw new Error(`User ${cfg.currentUserName} not found`);
        }
        await handler(cmdName, currentUser, ...args);
    }
}